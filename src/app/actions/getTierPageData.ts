"use server";

import { createClient } from "@/prismicio";
import {
  TierOnePageDocument,
  TierThreePageDocument,
  TierTwoPageDocument,
} from "../../../prismicio-types";

export type TierOnePageData = TierOnePageDocument<string> | null;
export type TierTwoPageData = TierTwoPageDocument<string> | null;
export type TierThreePageData = TierThreePageDocument<string> | null;

export async function getTierOnePageData(
  uid: string
): Promise<TierOnePageData> {
  const client = createClient();
  return client.getByUID("tierOnePage", uid);
}

export async function getTierTwoPageData(
  uid: string
): Promise<TierTwoPageData> {
  const client = createClient();
  return client.getByUID("tierTwoPage", uid);
}

export async function getTierThreePageData(
  uid: string
): Promise<TierThreePageData> {
  const client = createClient();
  return client.getByUID("tierThreePage", uid);
}
