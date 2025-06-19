"use server";

import { FilledContentRelationshipField } from "@prismicio/client";
import {
  TierTwoPageDocument,
  TierThreePageDocument,
  TierFourPageDocument,
} from "../../../prismicio-types";
import { getSearchData } from "./getSearchData";

export type PageType =
  | "tierOnePage"
  | "tierTwoPage"
  | "tierThreePage"
  | "tierFourPage";

export async function getParentPageUids(
  pageUid: string,
  pageType: PageType
): Promise<string[]> {
  const pages = await getSearchData();
  const currentPage = pages.find(
    (p) => p.uid === pageUid && p.type === pageType
  );

  if (!currentPage) {
    return [];
  }

  switch (pageType) {
    case "tierTwoPage": {
      const typedPage = currentPage as TierTwoPageDocument;
      const parentField = typedPage.data
        .parentPage as FilledContentRelationshipField<"tierOnePage">;
      return parentField?.uid ? [parentField.uid] : [];
    }
    case "tierThreePage": {
      const typedPage = currentPage as TierThreePageDocument;
      const parentField = typedPage.data
        .parentPage as FilledContentRelationshipField<"tierTwoPage">;
      if (!parentField?.uid) return [];

      const parentPage = pages.find((p) => p.uid === parentField.uid) as
        | TierTwoPageDocument
        | undefined;
      if (!parentPage) return [parentField.uid];

      const grandParentField = parentPage.data
        .parentPage as FilledContentRelationshipField<"tierOnePage">;
      return grandParentField?.uid
        ? [grandParentField.uid, parentField.uid]
        : [parentField.uid];
    }
    case "tierFourPage": {
      const typedPage = currentPage as TierFourPageDocument;
      const parentField = typedPage.data
        .parentPage as FilledContentRelationshipField<"tierThreePage">;
      if (!parentField?.uid) return [];

      const parentPage = pages.find((p) => p.uid === parentField.uid) as
        | TierThreePageDocument
        | undefined;
      if (!parentPage) return [parentField.uid];

      const grandParentField = parentPage.data
        .parentPage as FilledContentRelationshipField<"tierTwoPage">;
      if (!grandParentField?.uid) return [parentField.uid];

      const grandParentPage = pages.find(
        (p) => p.uid === grandParentField.uid
      ) as TierTwoPageDocument | undefined;
      if (!grandParentPage) return [parentField.uid, grandParentField.uid];

      const greatGrandParentField = grandParentPage.data
        .parentPage as FilledContentRelationshipField<"tierOnePage">;
      return greatGrandParentField?.uid
        ? [greatGrandParentField.uid, grandParentField.uid, parentField.uid]
        : [grandParentField.uid, parentField.uid];
    }
    default:
      return [];
  }
}
