"use server";

import { createClient } from "@/prismicio";
import { MenuItemSlice } from "../../../prismicio-types";

export async function getHomePageData() {
  const client = createClient();
  return (await client.getSingle("homepage"))?.data || null;
}

export async function getHeaderData() {
  const client = createClient();
  return (await client
    .getSingle("header", {
      fetchOptions: {
        next: {
          tags: ["header"],
          revalidate: 60 * 60 * 24 * 30, // Revalidate every 30 days
        },
      },
    })
    .catch(() => {
      return null;
    })) as { data: MenuItemSlice[] } | null;
}
