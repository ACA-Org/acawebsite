"use server";

import { createClient } from "@/prismicio";

export async function getContactPage() {
  const client = createClient();
  return (
    (
      await client.getSingle("contactPage", {
        fetchOptions: {
          next: {
            tags: ["contactPage"],
            revalidate: 60 * 60 * 24 * 30, // Revalidate every 30 days
          },
        },
      })
    )?.data || null
  );
}
