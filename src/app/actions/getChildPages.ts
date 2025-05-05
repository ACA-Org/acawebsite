"use server";

import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";

export async function getTierTwoPages(uid: string) {
  const client = createClient();
  const tierTwoPages = await client.getAllByType("tierTwoPage", {
    filters: [filter.at("my.tierTwoPage.parentPageUid", uid)],
  });

  return tierTwoPages;
}

export async function getTierThreePages(uid: string) {
  const client = createClient();
  const tierThreePages = await client.getAllByType("tierThreePage", {
    filters: [filter.at("my.tierThreePage.parentPageUid", uid)],
  });

  return tierThreePages;
}
