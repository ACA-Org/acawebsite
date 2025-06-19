// pages/api/imis-sso.ts
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRefresh } from "./utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const params = new URLSearchParams(body);
    const refresh_token = params.get("refresh_token");

    if (!refresh_token) {
      return NextResponse.json(
        { error: "Missing refresh_token" },
        { status: 400 }
      );
    }

    const tokenData = await getTokenFromRefresh(refresh_token);

    // Redirect to a client-side page that will handle the sign in
    const redirectUrl = new URL("/auth/complete-signin", request.url);
    redirectUrl.searchParams.set("token", tokenData.access_token);
    redirectUrl.searchParams.set("userName", tokenData.userName);

    return NextResponse.redirect(redirectUrl, {
      status: 303,
    });
  } catch (err) {
    console.error("[IMIS Auth] Authentication error:", {
      error: err instanceof Error ? err.message : "Unknown error",
      stack: err instanceof Error ? err.stack : undefined,
    });

    return NextResponse.json(
      { error: "Failed to process authentication" },
      { status: 500 }
    );
  }
}

