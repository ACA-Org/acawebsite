import { FilledContentRelationshipField } from "@prismicio/client";
import { PageData } from "@/app/actions/getSearchData";

export function linkResolver(
  doc: FilledContentRelationshipField,
  pages: PageData[]
): string {
  // console.log(doc);
  switch (doc.type) {
    case "tierOnePage":
      return `/${doc.uid}`;
    case "tierTwoPage": {
      const parentPage = pages.find((page) => page.uid === doc.uid);
      if (!parentPage) return "/";
      const parentId = (parentPage as any).data?.parentPage?.uid;
      if (!parentId) return "/";
      return `/${parentId}/${doc.uid}`;
    }
    case "tierThreePage": {
      const parentPage = pages.find((page) => page.uid === doc.uid);
      if (!parentPage) return "/";
      const parentId = (parentPage as any).data?.parentPage?.uid;
      if (!parentId) return "/";
      // Find the grandparent page
      const grandParentPage = pages.find((page) => page.uid === parentId);
      if (!grandParentPage) return "/";
      const grandParentId = (grandParentPage as any).data?.parentPage?.uid;
      if (!grandParentId) return "/";
      return `/${grandParentId}/${parentId}/${doc.uid}`;
    }
    case "tierFourPage": {
      const parentPage = pages.find((page) => page.uid === doc.uid);
      if (!parentPage) return "/";
      const parentId = (parentPage as any).data?.parentPage?.uid;
      if (!parentId) return "/";
      // Find the grandparent page
      const grandParentPage = pages.find((page) => page.uid === parentId);
      if (!grandParentPage) return "/";
      const grandParentId = (grandParentPage as any).data?.parentPage?.uid;
      if (!grandParentId) return "/";
      // Find the great-grandparent page
      const greatGrandParentPage = pages.find(
        (page) => page.uid === grandParentId
      );
      if (!greatGrandParentPage) return "/";
      const greatGrandParentId = (greatGrandParentPage as any).data?.parentPage
        ?.uid;
      if (!greatGrandParentId) return "/";
      return `/${greatGrandParentId}/${grandParentId}/${parentId}/${doc.uid}`;
    }
    case "newsletterDetail":
      return `/newsletters/${doc.uid}`;
    case "contactPage":
      return "/contact";
    case "locationsPage":
      return "/locations";
    case "privacyPolicy":
      return "/privacy_policy";
    default:
      return "/";
  }
}
