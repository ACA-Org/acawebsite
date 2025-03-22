"use server";

import { createClient } from "@/prismicio";
import { MenuItemSlice } from "../../../prismicio-types";

export async function getFooterData() {
    const client = createClient();
    return (
        (
            await client.getSingle("footer").catch(() => {
                return null;
            })
        )?.data || null
    );
}

export async function getHeaderData() {
    const client = createClient();
    return (await client.getSingle("header").catch(() => {
        return null;
    })) as { data: MenuItemSlice[] } | null;
}
