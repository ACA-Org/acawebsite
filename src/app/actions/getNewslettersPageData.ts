"use server";

import { createClient } from "@/prismicio";

export async function getNewsletterPageInfo() {
  const client = createClient();
  return (
    (
      await client.getSingle("newsletterPage", {
        fetchOptions: {
          next: {
            tags: ["newsletterPage"],
            revalidate: 60 * 60 * 24 * 30, // Revalidate every 30 days
          },
        },
      })
    )?.data || null
  );
}
