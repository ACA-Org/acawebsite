// pages/api/imis-sso.ts
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRefresh } from "./utils"; // you'll write this

export async function POST(request: NextRequest) {
  console.log("[IMIS Auth] Received POST request", {
    headers: Object.fromEntries(request.headers),
    url: request.url,
    method: request.method,
    body: await request.text(),
  });

  try {
    console.log("[IMIS Auth] Parsing request body...");
    const data = await request.json();
    console.log("[IMIS Auth] Parsed request data:", {
      ...data,
      refresh_token: data.refresh_token ? "[REDACTED]" : undefined,
    });
    const { refresh_token } = data;

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

    // Create a response with redirect
    const redirectUrl = new URL("/api/auth/callback/credentials", request.url);
    redirectUrl.searchParams.set("token", tokenData.access_token);

    console.log("[IMIS Auth] Redirecting to callback URL:", {
      callbackUrl: redirectUrl.pathname,
      hasToken: !!tokenData.access_token,
    });

    return NextResponse.redirect(redirectUrl);
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

