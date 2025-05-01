"use server";

import { createClient } from "@/prismicio";

export async function getHomePageData() {
  const client = createClient();
  return (await client.getSingle("homepage"))?.data || null;
}
