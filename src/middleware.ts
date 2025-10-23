import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getPageAuthRequirement } from "@/app/actions/getPageAuthRequirement";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (request.nextUrl.pathname === "/api/email/AdvancedEmail") {
    return new NextResponse(
      JSON.stringify({
        error: "This endpoint is no longer available",
        message: "The iMIS email integration has been deprecated",
      }),
      {
        status: 410,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/auth/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/public/") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|woff|woff2|ttf|otf)$/)
  ) {
    return NextResponse.next();
  }

  // Check if the page requires authentication
  const requiresAuth = await getPageAuthRequirement(pathname);

  if (requiresAuth) {
    // Check if user is authenticated
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      // Redirect to custom sign-in route with callback URL
      const signInUrl = new URL("/auth/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);

      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};

