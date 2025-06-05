// app/api/linkedin/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI!,
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  const tokenData = {
    access_token: data.access_token,
    refresh_token: data.refresh_token || null,
    expires_at: Date.now() + data.expires_in * 1000,
  };

  await fs.writeFile("linkedin_token.json", JSON.stringify(tokenData, null, 2));

  return new NextResponse(
    "✅ LinkedIn authorization successful. You may close this window."
  );
}

