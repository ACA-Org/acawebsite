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
    ...tierOneDocs,
    ...tierTwoDocs,
    ...tierThreeDocs,
    contactPage,
    locationsPage,
    privacyPolicy,
  ];
}
