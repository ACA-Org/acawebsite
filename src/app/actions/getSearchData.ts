"use server";

import { createClient } from "@/prismicio";
import {
  ContactPageDocument,
  LocationsPageDocument,
  PrivacyPolicyDocument,
  TierOnePageDocument,
  TierThreePageDocument,
  TierTwoPageDocument,
} from "../../../prismicio-types";

export type PageData =
  | TierOnePageDocument
  | TierTwoPageDocument
  | TierThreePageDocument
  | ContactPageDocument
  | PrivacyPolicyDocument
  | LocationsPageDocument;

export async function getSearchData(): Promise<PageData[]> {
  const client = createClient();

  const [
    tierOneDocs,
    tierTwoDocs,
    tierThreeDocs,
    contactPage,
    locationsPage,
    privacyPolicy,
  ] = await Promise.all([
    client.getAllByType("tierOnePage"),
    client.getAllByType("tierTwoPage"),
    client.getAllByType("tierThreePage"),
    client.getSingle("contactPage"),
    client.getSingle("locationsPage"),
    client.getSingle("privacyPolicy"),
  ]);

  return [
    ...tierOneDocs.filter((i) => !i.data.hidden),
    ...tierTwoDocs.filter((i) => !i.data.hidden),
    ...tierThreeDocs.filter((i) => !i.data.hidden),
    contactPage,
    locationsPage,
    privacyPolicy,
  ];
}

type SitemapEntry = {
  url: string;
  id: string;
  type: string;
};

export async function getSitemapUrls(): Promise<SitemapEntry[]> {
  const pages = await getSearchData();

  return pages.flatMap((page) => {
    switch (page.type) {
      case "tierOnePage":
        return {
          url: `/${page.uid}`,
          id: page.id,
          type: page.type,
        };
      case "tierTwoPage":
        // @ts-ignore: parentPage may exist on data
        const parentId = page.data.parentPage?.uid;
        if (!parentId) return [];
        return {
          url: `/${parentId}/${page.uid}`,
          id: page.id,
          type: page.type,
        };
      case "tierThreePage":
        // @ts-ignore: tierTwoParent and parentPage may exist on data
        const parentPageId =
          page.data.parentPage.link_type === "Document"
            ? page.data.parentPage.uid
            : null;
        const grandParentId = (
          pages.find((i) => i.uid === parentPageId) as
            | TierOnePageDocument
            | undefined
        )?.uid;
        if (!grandParentId || !parentPageId) return [];
        return {
          url: `/${grandParentId}/${parentPageId}/${page.uid}`,
          id: page.id,
          type: page.type,
        };
      default:
        // Skip contact, privacy, locations, etc.
        return [];
    }
  });
}
