"use server";

import { createClient } from "@/prismicio";
import { RightMenuDocument } from "../../../prismicio-types";

export type RightMenuData = RightMenuDocument<string> | null;

export async function getRightMenuData(uid: string): Promise<RightMenuData> {
    const client = createClient();
    return client.getByUID("rightMenu", uid).catch(() => {
        return null;
    });
}
