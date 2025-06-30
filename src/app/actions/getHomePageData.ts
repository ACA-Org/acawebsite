"use server";

import { createClient } from "@/prismicio";

export async function getHomePageData() {
  const client = createClient();
  return (
    (
      await client.getSingle("homepage", {
        fetchOptions: {
          next: {
            tags: ["homepage"],
            revalidate: 60 * 60 * 24 * 30, // Revalidate every 30 days
          },
        },
      })
    )?.data || null
  );
}
