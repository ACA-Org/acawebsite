"use server";

import { createClient } from "@/prismicio";

export async function getLocationsPageData() {
  const client = createClient();
  return (
    (
      await client.getSingle("locationsPage", {
        fetchOptions: {
          next: {
            tags: ["locationsPage"],
            revalidate: 60 * 60 * 24 * 30, // Revalidate every 30 days
          },
        },
      })
    )?.data || null
  );
}
