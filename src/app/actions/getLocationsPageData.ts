"use server";

import { createClient } from "@/prismicio";

export async function getLocationsPageData() {
  const client = createClient();
  return (await client.getSingle("locationsPage"))?.data || null;
}
