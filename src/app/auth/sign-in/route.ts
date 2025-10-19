// auth/sign-in/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Store the callback URL in a cookie so it's available after authentication
  const cookieStore = await cookies();
  cookieStore.set("authCallbackUrl", callbackUrl, {
    httpOnly: false, // Changed from true - needs to be readable by client-side JS
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });

  // Redirect to iMIS login
  const imisLoginUrl = process.env.NEXT_PUBLIC_IMIS_LOGIN_URL;

  if (!imisLoginUrl) {
    return NextResponse.json(
      { error: "iMIS login URL not configured" },
      { status: 500 }
    );
  }

  // iMIS will authenticate and post back to /api/imis with the refresh token
  // which will then redirect to /auth/complete-signin
  return NextResponse.redirect(imisLoginUrl);
}

