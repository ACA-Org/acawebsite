"use server";

import { createClient } from "@/prismicio";
import {
    TierThreePageDocument,
    TierTwoPageDocument,
} from "../../../prismicio-types";
import { FilledContentRelationshipField } from "@prismicio/client";

export type RightMenuItem = {
    label: string;
    href: string;
    children?: {
        label: string;
        href: string;
    }[];
};

export type RightMenuData = RightMenuItem[];

export async function getRightMenuData(
    uid: string,
    tier: "one" | "two" = "one"
): Promise<RightMenuData> {
    const client = createClient();

    // Fetch tier two pages
    const tierTwoPages = (await client.getAllByType("tierTwoPage"))?.filter(
        (i) =>
            i.data.parentPage &&
            (i.data.parentPage as FilledContentRelationshipField<"tierOnePage">)
                .uid === uid
    );

    if (tier === "one") {
        // Create menu items for tier two pages
        const menuItems: RightMenuData = await Promise.all(
            tierTwoPages.map(async (page: TierTwoPageDocument) => {
                // Fetch tier three pages for each tier two page
                const tierThreePages = (
                    await client.getAllByType("tierThreePage")
                )?.filter(
                    (i) =>
                        i.data.parentPage &&
                        (
                            i.data
                                .parentPage as FilledContentRelationshipField<"tierTwoPage">
                        ).uid === page.uid
                );

                // Create children menu items for tier three pages
                const children = tierThreePages.map(
                    (childPage: TierThreePageDocument) => ({
                        label:
                            childPage.uid
                                ?.split("_")
                                .at(-1)
                                ?.split("-")
                                .map(
                                    (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                )
                                .join(" ") || "",
                        href: `${page.uid}/${childPage.uid}`
                            ?.split("_")
                            .join("/"),
                    })
                );

                console.log({ tierTwoPages, children });

                return {
                    label:
                        page.uid
                            ?.split("_")
                            .at(-1)
                            ?.split("-")
                            .map(
                                (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ") || "",
                    href: `${page.uid}`.replace("_", "/"),
                    ...(children.length > 0 ? { children } : {}),
                };
            })
        );

        return menuItems;
    }

    const tierThreePages = (await client.getAllByType("tierThreePage"))?.filter(
        (i) =>
            i.data.parentPage &&
            (i.data.parentPage as FilledContentRelationshipField<"tierTwoPage">)
                .uid === uid
    );
    const menuItems = tierThreePages.map(
        (childPage: TierThreePageDocument) => ({
            label:
                childPage.uid
                    ?.split("_")
                    .at(-1)
                    ?.split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ") || "",
            href: `${childPage.uid}`?.split("_").join("/"),
        })
    );
    return menuItems;
}
