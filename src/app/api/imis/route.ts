// pages/api/imis-sso.ts
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRefresh } from "./utils";

export async function POST(request: NextRequest) {
  console.log("[IMIS Auth] Received POST request", {
    headers: Object.fromEntries(request.headers),
    url: request.url,
    method: request.method,
  });

  try {
    console.log("[IMIS Auth] Parsing request body...");
    const body = await request.text();
    const params = new URLSearchParams(body);
    const refresh_token = params.get("refresh_token");
    console.log("[IMIS Auth] Parsed request data:", {
      refresh_token: refresh_token ? "[REDACTED]" : undefined,
    });

    if (!refresh_token) {
      console.warn("[IMIS Auth] Missing refresh_token in request body");
      return NextResponse.json(
        { error: "Missing refresh_token" },
        { status: 400 }
      );
    }

    console.log("[IMIS Auth] Attempting to refresh token...");
    const tokenData = await getTokenFromRefresh(refresh_token);
    console.log("[IMIS Auth] Successfully obtained new token");

    // Redirect to a client-side page that will handle the sign in
    const redirectUrl = new URL("/auth/complete-signin", request.url);
    redirectUrl.searchParams.set("token", tokenData.access_token);

    console.log("[IMIS Auth] Redirecting to sign-in completion page");
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

