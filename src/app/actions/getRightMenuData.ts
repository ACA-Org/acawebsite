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
  tier: "one" | "two" | "three" = "one"
): Promise<RightMenuData | null> {
  const client = createClient();

  if (tier === "one") {
    // Fetch tier two pages
    const tierTwoPages = (await client.getAllByType("tierTwoPage"))?.filter(
      (i) =>
        i.data.parentPage &&
        !i.data.hideFromRightMenu &&
        !i.data?.hidden &&
        (i.data.parentPage as FilledContentRelationshipField<"tierOnePage">)
          .uid === uid
    );
    const menuItems: RightMenuData = await Promise.all(
      tierTwoPages.map(async (page: TierTwoPageDocument) => {
        // Fetch tier three pages for each tier two page
        const tierThreePages = (
          await client.getAllByType("tierThreePage", {
            graphQuery: `
                        {
                            tierThreePage {
                                uid
                                pageTitle
                                hideFromRightMenu
                                hidden
                                parentPage {
                                    ... on tierTwoPage {
                                        pageTitle
                                        uid
                                        hideFromRightMenu
                                        hidden
                                    }
                                }
                            }
                        }
                        `,
          })
        )?.filter((i) => {
          const parentPage = i.data.parentPage as
            | FilledContentRelationshipField<"tierTwoPage">
            | undefined;

          return (
            parentPage &&
            !i.data?.hideFromRightMenu &&
            !i.data?.hidden &&
            parentPage.uid === page.uid
          );
        });

        // Create children menu items for tier three pages
        const children = tierThreePages.map(
          (childPage: TierThreePageDocument) => ({
            label: childPage.data.pageTitle || "",
            href: `${page.uid}/${childPage.uid}`?.split("_").join("/"),
          })
        );

        return {
          label: page.data.pageTitle || "",
          href: `${page.uid}`.replace("_", "/"),
          ...(children.length > 0 ? { children } : {}),
        };
      })
    );

    return menuItems?.length > 0 ? menuItems : null;
  }

  if (tier === "two") {
    // Fetch tier three pages
    const tierThreePages = (await client.getAllByType("tierThreePage"))?.filter(
      (i) =>
        i.data.parentPage &&
        !i.data.hidden &&
        !i.data.hideFromRightMenu &&
        (i.data.parentPage as FilledContentRelationshipField<"tierTwoPage">)
          .uid === uid
    );

    const menuItems: RightMenuData = await Promise.all(
      tierThreePages.map(async (page: TierThreePageDocument) => {
        // Fetch tier four pages for each tier three page
        const tierFourPages = (
          await client.getAllByType("tierFourPage", {
            graphQuery: `
                        {
                            tierFourPage {
                                uid
                                pageTitle
                                hideFromRightMenu
                                hidden
                                parentPage {
                                    ... on tierThreePage {
                                        pageTitle
                                        uid
                                        hideFromRightMenu
                                        hidden
                                    }
                                }
                            }
                        }
                        `,
          })
        )?.filter((i) => {
          const parentPage = i.data.parentPage as
            | FilledContentRelationshipField<"tierThreePage">
            | undefined;

          return (
            parentPage &&
            !i.data?.hideFromRightMenu &&
            !i.data?.hidden &&
            parentPage.uid === page.uid
          );
        });

        // Create children menu items for tier four pages
        const children = tierFourPages.map((childPage) => ({
          label: childPage.data.pageTitle || "",
          href: `${page.uid}/${childPage.uid}`?.split("_").join("/"),
        }));

        return {
          label: page.data.pageTitle || "",
          href: `${page.uid}`.replace("_", "/"),
          ...(children.length > 0 ? { children } : {}),
        };
      })
    );

    return menuItems?.length > 0 ? menuItems : null;
  }

  if (tier === "three") {
    // For tier three pages, only fetch their direct tier four children
    const tierFourPages = (await client.getAllByType("tierFourPage"))?.filter(
      (i) =>
        i.data.parentPage &&
        !i.data.hidden &&
        !i.data.hideFromRightMenu &&
        (i.data.parentPage as FilledContentRelationshipField<"tierThreePage">)
          .uid === uid
    );

    const menuItems = tierFourPages.map((childPage) => ({
      label: childPage.data.pageTitle || "",
      href: `${childPage.uid}`?.split("_").join("/"),
    }));

    return menuItems?.length > 0 ? menuItems : null;
  }

  return null;
}
