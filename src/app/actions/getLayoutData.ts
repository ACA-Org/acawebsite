"use server";

import { createClient } from "@/prismicio";

export async function getFooterData() {
    const client = createClient();
    return await client.getSingle("footer").catch(() => {
        return null;
    });
}
