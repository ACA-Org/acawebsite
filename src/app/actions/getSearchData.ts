"use server";

import { createClient } from "@/prismicio";
import {
  AllDocumentTypes,
  TierOnePageDocument,
  TierTwoPageDocument,
  TierThreePageDocument,
  TierFourPageDocument,
  NewsletterDetailDocument,
  ContactPageDocument,
  LocationsPageDocument,
  PrivacyPolicyDocument,
  HomepageDocument,
  NewsletterPageDocument,
  HeaderDocument,
  FooterDocument,
  NextConferenceSectionDocument,
} from "../../../prismicio-types";

export type PageData = Exclude<
  AllDocumentTypes,
  HeaderDocument | FooterDocument | NextConferenceSectionDocument
>;

export async function getSearchData(): Promise<PageData[]> {
  const client = createClient();

  // const requests = [
  //   "tierOnePage",
  //   "tierTwoPage",
  //   "tierThreePage",
  //   "tierFourPage",
  //   "contactPage",
  //   "locationsPage",
  //   "privacyPolicy",
  //   "homepage",
  //   "newsletterPage",
  //   "newsletterDetail",
  // ] as const;

  const settled = await Promise.allSettled([
    client.getAllByType("tierOnePage"),
    client.getAllByType("tierTwoPage"),
    client.getAllByType("tierThreePage"),
    client.getAllByType("tierFourPage"),
    client.getSingle("contactPage"),
    client.getSingle("locationsPage"),
    client.getSingle("privacyPolicy"),
    client.getSingle("homepage"),
    client.getSingle("newsletterPage"),
    client.getAllByType("newsletterDetail"),
  ]);

  const unwrapArray = <T>(res: PromiseSettledResult<T[]>) =>
    res.status === "fulfilled" && Array.isArray(res.value)
      ? res.value
      : ([] as T[]);
  const unwrapSingle = <T>(res: PromiseSettledResult<T>) =>
    res.status === "fulfilled" ? res.value : null;

  const [
    tierOneDocs,
    tierTwoDocs,
    tierThreeDocs,
    tierFourDocs,
    contactPage,
    locationsPage,
    privacyPolicy,
    homepage,
    newsletterPage,
    newsletters,
  ] = [
    unwrapArray(settled[0] as PromiseSettledResult<TierOnePageDocument[]>),
    unwrapArray(settled[1] as PromiseSettledResult<TierTwoPageDocument[]>),
    unwrapArray(settled[2] as PromiseSettledResult<TierThreePageDocument[]>),
    unwrapArray(settled[3] as PromiseSettledResult<TierFourPageDocument[]>),
    unwrapSingle(settled[4] as PromiseSettledResult<ContactPageDocument>),
    unwrapSingle(settled[5] as PromiseSettledResult<LocationsPageDocument>),
    unwrapSingle(settled[6] as PromiseSettledResult<PrivacyPolicyDocument>),
    unwrapSingle(settled[7] as PromiseSettledResult<HomepageDocument>),
    unwrapSingle(settled[8] as PromiseSettledResult<NewsletterPageDocument>),
    unwrapArray(settled[9] as PromiseSettledResult<NewsletterDetailDocument[]>),
  ];

  return [
    ...tierOneDocs.filter((i) => !i.data.hidden && !i.data.requiresAuth),
    ...tierTwoDocs.filter((i) => !i.data.hidden && !i.data.requiresAuth),
    ...tierThreeDocs.filter((i) => !i.data.hidden && !i.data.requiresAuth),
    ...tierFourDocs.filter((i) => !i.data.hidden && !i.data.requiresAuth),
    ...newsletters.filter((i) => !i.data.requiresAuth),
    ...(homepage ? [homepage] : []),
    ...(newsletterPage ? [newsletterPage] : []),
    ...(contactPage ? [contactPage] : []),
    ...(locationsPage ? [locationsPage] : []),
    ...(privacyPolicy ? [privacyPolicy] : []),
  ] as PageData[];
}

type SitemapEntry = {
  url: string;
  id: string;
  type: string;
  lastModified: string;
};

export async function getSitemapUrls(): Promise<SitemapEntry[]> {
  const pages = await getSearchData();

  const filteredPages = pages.filter((page) => {
    const pageData = page.data as any;
    return !pageData.hidden && !pageData.requiresAuth;
  });

  return filteredPages.flatMap((page) => {
    switch (page.type) {
      case "tierOnePage":
        return {
          url: `/${page.uid}`,
          id: page.id,
          type: page.type,
          lastModified: page.last_publication_date,
        };
      case "tierTwoPage":
        // @ts-ignore: parentPage may exist on data
        const parentId = page.data.parentPage?.uid;
        if (!parentId) return [];
        return {
          url: `/${parentId}/${page.uid}`,
          id: page.id,
          type: page.type,
          lastModified: page.last_publication_date,
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
          lastModified: page.last_publication_date,
        };
      case "contactPage":
        return {
          url: "/contact",
          id: page.id,
          type: page.type,
          lastModified: page.last_publication_date,
        };
      case "locationsPage":
        return {
          url: "/locations",
          id: page.id,
          type: page.type,
          lastModified: page.last_publication_date,
        };
      case "privacyPolicy":
        return {
          url: "/privacy_policy",
          id: page.id,
          type: page.type,
          lastModified: page.last_publication_date,
        };
      case "homepage":
        return {
          url: `/`,
          id: page.id,
          type: page.type,
          lastModified: page.last_publication_date,
        };
      case "newsletterPage":
        return {
          url: `/newsletter`,
          id: page.id,
          type: page.type,
          lastModified: page.last_publication_date,
        };
      case "newsletterDetail":
        return {
          url: `/newsletter/${page.uid}`,
          id: page.id,
          type: page.type,
          lastModified: page.last_publication_date,
        };
      case "contactPage":
        return {
          url: "/contact",
          id: page.id,
          type: page.type,
          lastModified: page.last_publication_date,
        };
      case "locationsPage":
        return {
          url: "/locations",
          id: page.id,
          type: page.type,
          lastModified: page.last_publication_date,
        };
      case "privacyPolicy":
        return {
          url: "/privacy_policy",
          id: page.id,
          type: page.type,
          lastModified: page.last_publication_date,
        };

      default:
        return [];
    }
  });
}
