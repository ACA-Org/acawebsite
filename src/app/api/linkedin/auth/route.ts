// app/api/linkedin/auth/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const url = new URL("https://www.linkedin.com/oauth/v2/authorization");

  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", process.env.LINKEDIN_CLIENT_ID!);
  url.searchParams.set("redirect_uri", process.env.LINKEDIN_REDIRECT_URI!);
  url.searchParams.set("scope", "liteprofile%20emailaddress%20w_member_social");
  url.searchParams.set("state", "DCEeFWf45A53sdfKef424");

  return NextResponse.redirect(url.toString());
}
