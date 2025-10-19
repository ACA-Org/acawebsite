# Performance Analysis: High Fast Origin Transfer & Fluid Active CPU Usage

## Executive Summary

Your Vercel deployment is experiencing high **Fast Origin Transfer** and **Fluid Active CPU** usage due to several critical architecture issues that force every page to render dynamically on every request, bypassing Next.js's static generation and caching capabilities.

## Critical Issues Identified

### 1. 🚨 CRITICAL: Force Dynamic Rendering on All Pages

**Location:** All tier pages

- `src/app/[tier_one_uid]/page.tsx:23`
- `src/app/[tier_one_uid]/[tier_two_uid]/page.tsx:27`
- `src/app/[tier_one_uid]/[tier_two_uid]/[tier_three_uid]/page.tsx:27`

**Issue:**

```typescript
export const dynamic = "force-dynamic";
```

**Impact:**

- **Every single page** is rendered on-demand for every request
- No static generation or edge caching occurs
- Every visit triggers a Function execution (Fast Origin Transfer)
- High CPU usage for rendering content that rarely changes

**Cost Implications:**

- Each page visit = 1 Function invocation + Full data transfer
- For 10,000 page views, this means 10,000 function executions instead of 0

**Recommended Fix:**
Remove `export const dynamic = "force-dynamic"` from all pages. Let Next.js determine the rendering strategy. For authenticated pages, use:

```typescript
export const dynamic = "auto"; // or remove entirely
```

---

### 2. 🚨 CRITICAL: Expensive Data Fetching in Root Layout

**Location:** `src/app/layout.tsx:54-102`

**Issue:**
The root layout fetches data on **EVERY request** for **EVERY page**:

```typescript
await Promise.allSettled([
  fetchFooterInfo(), // Prismic API call
  fetchHeaderInfo(), // Prismic API call
  fetchPagesInfo(), // 🔥 EXTREMELY EXPENSIVE - fetches ALL pages
  fetchUserInfo(), // Auth check
]);
```

**The `getSearchData()` function (line 84) is particularly expensive:**

- Fetches ALL tierOnePage documents
- Fetches ALL tierTwoPage documents
- Fetches ALL tierThreePage documents
- Fetches ALL tierFourPage documents
- Fetches ALL newsletterDetail documents
- Fetches all singleton pages

**Impact:**

- Every page load = ~10+ Prismic API calls
- Massive Fast Origin Transfer usage
- High CPU usage for data processing
- Slow initial page loads

**Recommended Fix:**

```typescript
// Option 1: Move search data to client-side with SWR/React Query
// Only fetch when search dialog opens

// Option 2: Use generateStaticParams and static generation
// Generate search index at build time

// Option 3: Create a dedicated search API endpoint
// Fetch only when needed, cache aggressively
```

---

### 3. ⚠️ HIGH: In-Memory Cache in Serverless Environment

**Locations:**

- `src/lib/mongodb.ts:47-54` (Locations cache)
- `src/app/api/linkedin/posts/route.ts:24` (LinkedIn posts cache)

**Issue:**

```typescript
let cache: CacheData | null = null; // In-memory cache
```

**Impact:**
In a serverless environment, each function instance has its own memory:

- Cache is **not shared** across function instances
- Cold starts reset the cache
- Multiple concurrent requests = multiple cache misses
- Results in redundant MongoDB/API calls

**Recommended Fix:**
Use Vercel's Data Cache or a distributed cache:

```typescript
// Option 1: Vercel Data Cache (built-in)
export const revalidate = 300; // Cache for 5 minutes

// Option 2: Redis/Upstash
// Shared cache across all function instances

// Option 3: Vercel KV
import { kv } from "@vercel/kv";
```

---

### 4. ⚠️ HIGH: No Caching Headers on Functions

**Issue:**
Most server actions and functions don't set appropriate cache headers, forcing the origin to process every request.

**Recommended Fix:**
Add caching to server actions:

```typescript
// src/app/actions/getLayoutData.ts
export async function getHeaderData() {
  const client = createClient();
  return await client.getSingle("header", {
    fetchOptions: {
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ["header"],
      },
    },
  });
}
```

---

### 5. ⚠️ MEDIUM: Duplicate Data Fetching

**Issue:**
Pages fetch data twice:

1. In `generateMetadata()`
2. In the page component

Example from `src/app/[tier_one_uid]/page.tsx`:

```typescript
// Lines 125-134: Fetches page data
export async function generateMetadata({ params }) {
  const page = await client.getByUID("tierOnePage", tier_one_uid);
  // ...
}

// Lines 25-34: Fetches same page data again
export default async function Page({ params }) {
  const pageData = await getTierOnePageData(tier_one_uid);
  // ...
}
```

**Impact:**
While Next.js should deduplicate these requests in theory, the explicit caching configurations might prevent this optimization.

**Recommended Fix:**
Use React cache() or ensure fetch deduplication:

```typescript
import { cache } from "react";

const getPageData = cache(async (uid: string) => {
  return await getTierOnePageData(uid);
});
```

---

### 6. ⚠️ MEDIUM: Authentication Check on Every Request

**Location:** `src/app/layout.tsx:92-94`

**Issue:**

```typescript
const fetchUserInfo = async () => {
  const session = await getServerSession(authOptions);
  userInfo = session?.user || null;
};
```

**Impact:**

- Runs on every page load
- Adds latency to all requests
- Contributes to Fluid Active CPU usage

**Recommended Fix:**
Move auth checks to page level:

```typescript
// Only check auth on pages that require it
if (requiresAuth) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return <Unauthenticated />;
  }
}
```

---

## Quantified Impact Estimates

Based on typical usage patterns:

### Current State (1,000 page views/day):

- **Edge Requests:** ~1,000 (normal)
- **Function Invocations:** ~1,000 (for dynamic rendering)
- **Fast Origin Transfer:** High (every request hits origin)
- **Data fetched per page load:** ~500KB - 2MB (all Prismic data)

### After Optimization:

- **Edge Requests:** ~1,000 (same)
- **Function Invocations:** ~10-50 (only for ISR revalidation)
- **Fast Origin Transfer:** Minimal (served from edge cache)
- **Data fetched per page load:** 0KB (cached at edge)

**Potential Savings:** 90-95% reduction in compute costs

---

## Recommended Implementation Priority

### Phase 1: Immediate (High Impact, Low Effort)

1. ✅ Remove `export const dynamic = "force-dynamic"` from all pages
2. ✅ Move `getSearchData()` out of root layout
3. ✅ Add `export const revalidate = 3600` to static pages

### Phase 2: Short-term (High Impact, Medium Effort)

4. ✅ Implement proper caching for locations (Vercel Data Cache)
5. ✅ Move auth checks to page-level only where needed
6. ✅ Add cache headers to API routes

### Phase 3: Long-term (Medium Impact, High Effort)

7. ⚠️ Migrate to Redis/Upstash for distributed caching
8. ⚠️ Implement incremental static regeneration (ISR) properly
9. ⚠️ Add CDN caching for Prismic responses

---

## Monitoring Recommendations

After implementing fixes, monitor:

1. **Vercel Dashboard > Usage:**

   - Fast Origin Transfer (should drop 80-90%)
   - Function invocations (should drop 90-95%)
   - Edge requests (will stay same - this is normal)

2. **Vercel Dashboard > Analytics:**

   - TTFB (Time to First Byte) - should improve
   - Cold start frequency

3. **Application Performance:**
   - Initial page load time
   - Navigation speed between pages

---

## References

- [Vercel CDN Usage Documentation](https://vercel.com/docs/manage-cdn-usage#fast-origin-transfer)
- [Next.js Caching Documentation](https://nextjs.org/docs/app/building-your-application/caching)
- [Vercel Functions Pricing](https://vercel.com/docs/functions/usage-and-pricing)
- [Incremental Static Regeneration](https://vercel.com/docs/incremental-static-regeneration)

---

## Next Steps

1. Review this analysis with your team
2. Prioritize fixes based on impact vs. effort
3. Implement Phase 1 changes (estimated 1-2 hours)
4. Deploy to preview environment and test
5. Monitor metrics for 24-48 hours
6. Roll out to production if results are positive

**Expected Timeline:** Phase 1 can be completed in 1-2 hours and should show immediate cost reductions.

