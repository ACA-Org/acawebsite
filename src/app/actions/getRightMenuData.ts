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

  if (tier === "one") {
    // Fetch tier two pages
    const tierTwoPages = (await client.getAllByType("tierTwoPage"))?.filter(
      (i) =>
        i.data.parentPage &&
        !i.data.hideFromRightMenu &&
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
                                hideFromRightMenu
                                parentPage {
                                    ... on tierTwoPage {
                                        uid
                                        hideFromRightMenu
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

    return menuItems;
  }
  const tierThreePages = (await client.getAllByType("tierThreePage"))?.filter(
    (i) =>
      i.data.parentPage &&
      (i.data.parentPage as FilledContentRelationshipField<"tierTwoPage">)
        .uid === uid
  );
  const menuItems = tierThreePages.map((childPage: TierThreePageDocument) => ({
    label: childPage.data.pageTitle || "",
    href: `${childPage.uid}`?.split("_").join("/"),
  }));
  return menuItems;
}
