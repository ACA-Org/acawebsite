"use server";

import { createClient } from "@/prismicio";

export async function getContactPage() {
  const client = createClient();
  return (await client.getSingle("contactPage"))?.data || null;
}
