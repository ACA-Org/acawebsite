// pages/api/imis-sso.ts
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRefresh } from "./utils"; // you'll write this

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { refresh_token } = data;

    if (!refresh_token) {
      return NextResponse.json(
        { error: "Missing refresh_token" },
        { status: 400 }
      );
    }

    const tokenData = await getTokenFromRefresh(refresh_token);

    // Create a response with redirect
    const redirectUrl = new URL("/api/auth/callback/credentials", request.url);
    redirectUrl.searchParams.set("token", tokenData.access_token);

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error("IMIS auth error:", err);
    return NextResponse.json(
      { error: "Failed to process authentication" },
      { status: 500 }
    );
  }
}

