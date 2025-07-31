import { asText } from "@prismicio/richtext";
import { PageData } from "@/app/actions/getSearchData";

export type FuseMatch = {
  indices: readonly [number, number][];
  key?: string;
  refIndex?: number;
  value?: string;
};

export type SearchResult = PageData & {
  matches?: readonly FuseMatch[];
};

// Type guards for checking page content fields
export function hasPageContent(
  page: PageData
): page is PageData & { data: { pageContent: any } } {
  return "pageContent" in page.data && page.data.pageContent != null;
}

export function hasPageTextContent(
  page: PageData
): page is PageData & { data: { pageTextContent: any } } {
  return "pageTextContent" in page.data && page.data.pageTextContent != null;
}

export function getPageContent(page: PageData): string {
  if (hasPageContent(page)) {
    return asText(page.data.pageContent);
  }
  if (hasPageTextContent(page)) {
    return asText(page.data.pageTextContent);
  }
  return "";
}

export function getPageTitle(page: PageData): string {
  switch (page.type) {
    case "homepage":
      return (
        ("heroTopTitle" in page.data ? page.data.heroTopTitle : null) ||
        ("heroBottomTitle" in page.data ? page.data.heroBottomTitle : null) ||
        ""
      );
    case "newsletterDetail":
      return ("newsTitle" in page.data ? page.data.newsTitle : null) || "";
    default:
      return ("pageTitle" in page.data ? page.data.pageTitle : null) || "";
  }
}
