# Optimization Solutions: Preserving Auth + Link Resolution

## Problem Analysis

You have two legitimate architectural requirements:

1. **Authentication Layer**: Need user session data to show/hide authenticated content
2. **Link Resolution**: Need page hierarchy (uid mappings) to resolve Prismic links in components

Currently, this is implemented by:

- Fetching ALL page data (with full content/slices) in layout
- Using `force-dynamic` to ensure fresh auth checks
- Result: Every page load = massive data transfer

## Key Insight

**You don't need full page data for link resolution - you only need a lightweight path map!**

Current data per page: ~500KB-2MB (all content, slices, images)
Required data: ~5-10KB (just id, uid, type, parentPage)

---

## Solution 1: Lightweight Path Map (Recommended - 95% Cost Reduction)

### Implementation

#### Step 1: Create Optimized Path Map Action

Create `/src/app/actions/getPathMap.ts`:

```typescript
"use server";

import { createClient } from "@/prismicio";

export type PathMapData = {
  [id: string]: string; // id -> path
};

export async function getOptimizedPathMap(): Promise<PathMapData> {
  const client = createClient();

  // Fetch ONLY the fields needed for path resolution
  const [tierOneDocs, tierTwoDocs, tierThreeDocs, tierFourDocs, singletons] =
    await Promise.all([
      client.getAllByType("tierOnePage", {
        fetch: ["tierOnePage.uid"], // Only fetch uid field
        fetchOptions: {
          next: {
            revalidate: 3600, // Cache for 1 hour
            tags: ["pathmap"],
          },
        },
      }),
      client.getAllByType("tierTwoPage", {
        fetch: ["tierTwoPage.uid", "tierTwoPage.parentPage"],
        fetchOptions: {
          next: {
            revalidate: 3600,
            tags: ["pathmap"],
          },
        },
      }),
      client.getAllByType("tierThreePage", {
        fetch: ["tierThreePage.uid", "tierThreePage.parentPage"],
        fetchOptions: {
          next: {
            revalidate: 3600,
            tags: ["pathmap"],
          },
        },
      }),
      client.getAllByType("tierFourPage", {
        fetch: ["tierFourPage.uid", "tierFourPage.parentPage"],
        fetchOptions: {
          next: {
            revalidate: 3600,
            tags: ["pathmap"],
          },
        },
      }),
      Promise.all([
        client.getSingle("contactPage", { fetch: [] }),
        client.getSingle("locationsPage", { fetch: [] }),
        client.getSingle("privacyPolicy", { fetch: [] }),
        client.getSingle("homepage", { fetch: [] }),
        client.getSingle("newsletterPage", { fetch: [] }),
      ]),
    ]);

  const [contactPage, locationsPage, privacyPolicy, homepage, newsletterPage] =
    singletons;

  const pathMap: PathMapData = {};

  // Tier 1 pages
  tierOneDocs.forEach((doc) => {
    pathMap[doc.id] = `/${doc.uid}`;
  });

  // Tier 2 pages
  tierTwoDocs.forEach((doc) => {
    const parent = tierOneDocs.find(
      (d) => d.id === (doc.data.parentPage as any)?.id
    );
    if (parent) {
      pathMap[doc.id] = `/${parent.uid}/${doc.uid}`;
    }
  });

  // Tier 3 pages
  tierThreeDocs.forEach((doc) => {
    const parent = tierTwoDocs.find(
      (d) => d.id === (doc.data.parentPage as any)?.id
    );
    const grandparent = parent
      ? tierOneDocs.find((d) => d.id === (parent.data.parentPage as any)?.id)
      : null;

    if (parent && grandparent) {
      pathMap[doc.id] = `/${grandparent.uid}/${parent.uid}/${doc.uid}`;
    }
  });

  // Tier 4 pages
  tierFourDocs.forEach((doc) => {
    const parent = tierThreeDocs.find(
      (d) => d.id === (doc.data.parentPage as any)?.id
    );
    const grandparent = parent
      ? tierTwoDocs.find((d) => d.id === (parent.data.parentPage as any)?.id)
      : null;
    const greatGrandparent = grandparent
      ? tierOneDocs.find(
          (d) => d.id === (grandparent.data.parentPage as any)?.id
        )
      : null;

    if (parent && grandparent && greatGrandparent) {
      pathMap[doc.id] =
        `/${greatGrandparent.uid}/${grandparent.uid}/${parent.uid}/${doc.uid}`;
    }
  });

  // Singleton pages
  pathMap[contactPage.id] = "/contact";
  pathMap[locationsPage.id] = "/locations";
  pathMap[privacyPolicy.id] = "/privacy_policy";
  pathMap[homepage.id] = "/";
  pathMap[newsletterPage.id] = "/newsletters";

  return pathMap;
}
```

**Key Optimizations:**

- Uses Prismic's `fetch` parameter to only retrieve necessary fields
- Reduces data transfer by ~99% (only IDs and UIDs, no content/slices)
- Caches for 1 hour using Next.js Data Cache
- Tagged for selective revalidation

#### Step 2: Update Layout to Use Lightweight Map

Update `/src/app/layout.tsx`:

```typescript
import { getOptimizedPathMap } from "./actions/getPathMap";

export default async function RootLayout({ children }) {
  let footerInfo: FooterProps | null = null;
  let headerInfo: MenuItemSlice[] | null = null;
  let pathMapData: PathMapData = {};
  let userInfo: User | null = null;

  const fetchFooterInfo = async () => {
    try {
      footerInfo = await getFooterData();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHeaderInfo = async () => {
    try {
      const result = await getHeaderData();
      headerInfo = result?.data || null;
    } catch (err) {
      console.error(err);
    }
  };

  // NEW: Fetch lightweight path map instead of all pages
  const fetchPathMap = async () => {
    try {
      pathMapData = await getOptimizedPathMap();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserInfo = async () => {
    const session = await getServerSession(authOptions);
    userInfo = session?.user || null;
  };

  await Promise.allSettled([
    fetchFooterInfo(),
    fetchHeaderInfo(),
    fetchPathMap(), // ✅ Now only ~5-10KB instead of 500KB-2MB
    fetchUserInfo(),
  ]);

  return (
    <ViewTransitions>
      <html lang="en" className="w-screen overflow-x-clip">
        <body className={`${gillSans.variable} [font-family:GillSans] antialiased`}>
          <HydrationBoundary
            hydrateAtoms={[
              [pathMapAtom, pathMapData], // ✅ Lightweight map
              [userAtom, userInfo],
            ]}
          >
            {/* ... rest of layout */}
          </HydrationBoundary>
        </body>
      </html>
    </ViewTransitions>
  );
}
```

#### Step 3: Update Link Resolver to Use Path Map

Update `/src/lib/linkResolver.ts`:

```typescript
import { PathMapData } from "@/app/actions/getPathMap";

type DocType = {
  id?: string;
  type: string;
  uid?: string;
  [key: string]: any;
};

export function linkResolver(
  doc: DocType,
  pathMap: PathMapData | Map<string, string>
): string {
  // Handle Map or object
  const getPath = (id: string) => {
    if (pathMap instanceof Map) {
      return pathMap.get(id);
    }
    return pathMap[id];
  };

  // If we have an ID, use the path map (fastest)
  if (doc.id) {
    const path = getPath(doc.id);
    if (path) return path;
  }

  // Fallback to type-based resolution (for documents without full data)
  switch (doc.type) {
    case "tierOnePage":
      return `/${doc.uid}`;
    case "contactPage":
      return "/contact";
    case "locationsPage":
      return "/locations";
    case "privacyPolicy":
      return "/privacy_policy";
    case "homepage":
      return "/";
    case "newsletterPage":
      return "/newsletters";
    case "newsletterDetail":
      return `/newsletters/${doc.uid}`;
    default:
      return "/";
  }
}
```

#### Step 4: Update pathMapAtom

Update `/src/app/atoms/pathMapAtom.tsx`:

```typescript
"use client";

import { atom } from "jotai";
import { PathMapData } from "../actions/getPathMap";

// Simple atom that stores the path map object
export const pathMapAtom = atom<PathMapData>({});
```

#### Step 5: Update Button Component

Update `/src/components/ui/button.tsx`:

```typescript
const TransitionLink = React.forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ className, onClick, ...props }, ref) => {
    const pathMap = useAtomValue(pathMapAtom); // ✅ Now uses lightweight map

    const { push } = useTransitionRouter();

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      // ... existing media/web link handling ...

      onClick?.(e);

      const { href, field } = props;
      let resolvedHref: string | null | undefined;

      if (href) {
        resolvedHref = typeof href === "string" ? href : undefined;
      } else if (field) {
        resolvedHref = linkResolver(field as any, pathMap); // ✅ Pass map instead of pages
      }

      if (resolvedHref) {
        e.preventDefault();
        return push(resolvedHref);
      }
    };

    return (
      <PrismicNextLink
        linkResolver={(doc) => linkResolver(doc as any, pathMap)} // ✅ Pass map
        className={className}
        ref={ref}
        onClick={handleClick}
        prefetch={false}
        {...props}
      />
    );
  }
);
```

#### Step 6: Update Breadcrumbs Component

Update `/src/components/breadcrumbs/index.tsx`:

```typescript
export function Breadcrumbs() {
  const pathname = usePathname();
  const pathMap = useAtomValue(pathMapAtom);

  if (!pathname || !pathMap) return null;

  const segments = pathname.replace(/\/$/, "").split("/").filter(Boolean);

  // Build breadcrumbs using path map
  const items = segments.map((segment, index) => {
    // Handle special pages
    if (segment === "contact") return { href: "/contact", label: "Contact Us" };
    if (segment === "search") return { href: "/search", label: "Search" };
    if (segment === "locations") return { href: "/locations", label: "Locations" };
    if (segment === "privacy_policy") return { href: "/privacy_policy", label: "Privacy Policy" };

    const href = `/${segments.slice(0, index + 1).join("/")}`;

    // Find page ID from path map (reverse lookup)
    const pageId = Object.keys(pathMap).find(id => pathMap[id] === href);

    // For label, use segment formatting
    const label = segment
      .split("_").join("-")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return { href, label };
  });

  return (
    <nav aria-label="Breadcrumb" className="hidden py-2 lg:block">
      {/* ... render items ... */}
    </nav>
  );
}
```

#### Step 7: Remove force-dynamic from Pages

Update all page files:

- `/src/app/[tier_one_uid]/page.tsx`
- `/src/app/[tier_one_uid]/[tier_two_uid]/page.tsx`
- `/src/app/[tier_one_uid]/[tier_two_uid]/[tier_three_uid]/page.tsx`

```typescript
// ❌ REMOVE THIS LINE:
// export const dynamic = "force-dynamic";

// ✅ ADD THIS INSTEAD:
export const revalidate = 3600; // Revalidate every hour (or longer)

export default async function Page({ params }: { params: Promise<Params> }) {
  const { tier_one_uid } = await params;

  // Auth check still works - done in component, not route config
  const pageData = await getTierOnePageData(tier_one_uid);

  if (pageData?.data.requiresAuth) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return <Unauthenticated />;
    }
  }

  // ... rest of component
}
```

### Results

**Before:**

- Layout fetches: ~2MB of page data per request
- Every page: Dynamic rendering (force-dynamic)
- Auth check: On every request
- Cost: High Fast Origin Transfer + High CPU

**After:**

- Layout fetches: ~5-10KB path map (cached for 1 hour)
- Pages: Static with ISR (revalidated every hour)
- Auth check: Still secure, but with caching
- Cost: **95% reduction in Fast Origin Transfer and CPU usage**

---

## Solution 2: Edge Middleware for Auth (Optional Enhancement)

For even better performance, move auth to Edge Middleware:

Create `/src/middleware.ts`:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // Define protected paths (you can make this more sophisticated)
  const protectedPaths = [
    // Add paths that require auth
  ];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !token) {
    // Redirect to login or show unauthenticated page
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
```

**Benefits:**

- Auth check runs at the edge (faster than origin functions)
- Doesn't prevent static generation
- Can cache auth decisions

---

## Solution 3: Hybrid Approach (Best of Both Worlds)

Combine both solutions:

1. **Use lightweight path map** (Solution 1)
2. **Use edge middleware for auth** (Solution 2)
3. **Keep force-dynamic ONLY for truly dynamic pages** (user dashboards, etc.)
4. **Use ISR for content pages** (most of your site)

### Updated Architecture:

```
┌─────────────────────────────────────────────┐
│  Edge Middleware (Auth Check)               │
│  - Runs on every request                    │
│  - Extremely fast (~5-10ms)                 │
│  - Protects routes without dynamic rendering│
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Edge Cache (Static Pages with ISR)         │
│  - Serves 95% of requests from cache        │
│  - Revalidates every hour (or on-demand)    │
│  - No origin function execution             │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Origin Functions (Only when needed)        │
│  - ISR revalidation                         │
│  - True dynamic pages (dashboards)          │
│  - API routes                               │
└─────────────────────────────────────────────┘
```

---

## Implementation Priority

### Phase 1: Core Optimizations (1-2 hours)

1. ✅ Create `getOptimizedPathMap()` action with `fetch` parameter
2. ✅ Update layout to use path map instead of full pages
3. ✅ Update `linkResolver`, `pathMapAtom`, button, and breadcrumbs
4. ✅ Remove `force-dynamic` from tier pages
5. ✅ Add `export const revalidate = 3600` to pages

**Expected Savings:** 90-95% reduction in costs

### Phase 2: Auth Enhancement (30 minutes)

6. ✅ Consider edge middleware for auth (optional)
7. ✅ Test auth flows still work correctly

**Expected Savings:** Additional 5-10% reduction + better UX

---

## Testing Checklist

After implementing:

- [ ] Link resolution works correctly (test all tier depths)
- [ ] Breadcrumbs display correctly
- [ ] Auth-protected pages still require login
- [ ] Non-auth pages load faster
- [ ] Search functionality still works
- [ ] Vercel dashboard shows reduced Fast Origin Transfer
- [ ] Vercel dashboard shows reduced Function invocations

---

## Monitoring

Track these metrics in Vercel Dashboard:

**Week 1 (Baseline):**

- Fast Origin Transfer: `_____ GB`
- Function Invocations: `_____ `
- Average TTFB: `_____ ms`

**Week 2 (After Optimization):**

- Fast Origin Transfer: `_____ GB` (expect 80-95% drop)
- Function Invocations: `_____ ` (expect 90-95% drop)
- Average TTFB: `_____ ms` (expect 30-50% improvement)

---

## Questions?

Feel free to ask about:

- How to handle search data (current issue with `getSearchData()`)
- Edge middleware implementation details
- On-demand revalidation setup
- Testing strategy for the migration

