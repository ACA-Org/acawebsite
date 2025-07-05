"use server";

import { createClient } from "@/prismicio";

export async function getNewsletterPageInfo() {
  const client = createClient();
  return (await client.getSingle("newsletterPage"))?.data || null;
}
