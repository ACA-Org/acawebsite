"use client";

import { PathMap } from "@/lib/prismicPathMap";
import { atom } from "jotai";
import { pageInfoAtom } from "./pageInfoAtom";
import { FilledContentRelationshipField } from "@prismicio/client";
import {
  TierTwoPageDocument,
  TierThreePageDocument,
  TierFourPageDocument,
} from "../../../prismicio-types";

export const pathMapAtom = atom<PathMap>((get) => {
  const pages = get(pageInfoAtom);
  const map = new Map<string, string>();

  // Get all pages by type
  const tierOneDocs = pages.filter((page) => page.type === "tierOnePage");
  const tierTwoDocs = pages.filter((page) => page.type === "tierTwoPage");
  const tierThreeDocs = pages.filter((page) => page.type === "tierThreePage");
  const tierFourDocs = pages.filter((page) => page.type === "tierFourPage");
  const contactPage = pages.find((page) => page.type === "contactPage");
  const locationsPage = pages.find((page) => page.type === "locationsPage");
  const privacyPolicy = pages.find((page) => page.type === "privacyPolicy");

  // Map tier one pages
  for (const doc of tierOneDocs) {
    map.set(doc.id, `/${doc.uid}`);
  }

  // Map tier two pages
  for (const doc of tierTwoDocs) {
    const parent = tierOneDocs.find(
      (d) =>
        d.id ===
        (
          (doc as TierTwoPageDocument).data
            .parentPage as FilledContentRelationshipField
        )?.id
    );
    if (parent) {
      map.set(doc.id, `/${parent.uid}/${doc.uid}`);
    }
  }

  // Map tier three pages
  for (const doc of tierThreeDocs) {
    const parent = tierTwoDocs.find(
      (d) =>
        d.id ===
        (
          (doc as TierThreePageDocument).data
            .parentPage as FilledContentRelationshipField
        )?.id
    );
    const grandparent = parent
      ? tierOneDocs.find(
          (d) =>
            d.id ===
            (
              (parent as TierTwoPageDocument).data
                .parentPage as FilledContentRelationshipField
            )?.id
        )
      : null;

    if (parent && grandparent) {
      map.set(doc.id, `/${grandparent.uid}/${parent.uid}/${doc.uid}`);
    }
  }

  // Map tier four pages
  for (const doc of tierFourDocs) {
    const parent = tierThreeDocs.find(
      (d) =>
        d.id ===
        (
          (doc as TierFourPageDocument).data
            .parentPage as FilledContentRelationshipField
        )?.id
    );
    const grandparent = parent
      ? tierTwoDocs.find(
          (d) =>
            d.id ===
            (
              (parent as TierThreePageDocument).data
                .parentPage as FilledContentRelationshipField
            )?.id
        )
      : null;

    const greatgrandparent = grandparent
      ? tierOneDocs.find(
          (d) =>
            d.id ===
            (
              (grandparent as TierTwoPageDocument).data
                .parentPage as FilledContentRelationshipField
            )?.id
        )
      : null;

    if (parent && grandparent && greatgrandparent) {
      map.set(
        doc.id,
        `/${greatgrandparent.uid}/${grandparent.uid}/${parent.uid}/${doc.uid}`
      );
    }
  }

  // Map special pages
  if (contactPage) map.set(contactPage.id, `/contact`);
  if (locationsPage) map.set(locationsPage.id, `/locations`);
  if (privacyPolicy) map.set(privacyPolicy.id, `/privacy_policy`);

  return map;
});
