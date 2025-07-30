"use server";

import { createClient } from "@/prismicio";
import { NewsletterDetailDocument } from "../../../prismicio-types";
// import { filter } from "@prismicio/client";

export type NewsletterDetailPageData = NewsletterDetailDocument<string> | null;

export async function getNewsletterDetailPageData(
  uid: string
): Promise<NewsletterDetailPageData> {
  const client = createClient();
  return client.getByUID("newsletterDetail", uid, {
    // filters: [filter.not("my.tierOnePage.hidden", true)],

    fetchOptions: {
      next: {
        tags: [uid],
        revalidate: 60 * 60 * 24 * 30, // Revalidate every 30 days
      },
    },
  });
}
