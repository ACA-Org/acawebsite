import type { MetadataRoute } from "next";
import { getSitemapUrls } from "./actions/getSearchData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getSitemapUrls();

  return pages.map((page) => ({
    url: `https://www.aca.org${page.url}`,
    lastModified: new Date(page.lastModified),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
}

