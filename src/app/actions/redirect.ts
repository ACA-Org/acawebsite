"use server";

import { headers } from "next/headers";

export async function serverGetImisLoginUrl() {
  const headersList = await headers();
  const host = headersList.get("X-Forwarded-Host");
  const proto = headersList.get("X-Forwarded-Proto");
  const imisLoginUrl = process.env.NEXT_PUBLIC_IMIS_LOGIN_URL;
  const redirectUrl = `${proto}://${host}/api/imis`;

  return `${imisLoginUrl}?redirect_uri=${encodeURIComponent(redirectUrl)}`;
}
