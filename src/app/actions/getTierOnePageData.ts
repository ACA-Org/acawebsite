"use server";

import { createClient } from "@/prismicio";
import { TierOnePageDocument } from "../../../prismicio-types";

export type TierOnePageData = TierOnePageDocument<string> | null;

export async function getTierOnePageData(uid: string) {
    const client = createClient();
    return client.getByUID("tierOnePage", uid);
}
