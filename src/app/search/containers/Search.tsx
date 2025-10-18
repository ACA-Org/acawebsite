"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import Fuse from "fuse.js";
import { useAtomValue } from "jotai";

import { LinkButton } from "@/components/ui/button";
import { pageInfoAtom } from "@/app/atoms/pageInfoAtom";
import {
  FuseMatch,
  SearchResult,
  getPageContent,
  getPageTitle,
} from "@/lib/searchUtils";

export const Search = () => {
  const pages = useAtomValue(pageInfoAtom);
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(
        pages.filter((i) => !(i.data as any).requiresAuth),
        {
          keys: [
            {
              name: "title",
              getFn: (page) => getPageTitle(page),
            },
            {
              name: "content",
              getFn: (page) => getPageContent(page),
            },
          ],
          threshold: 0.5,
          includeMatches: true,
          isCaseSensitive: false,
        }
      ),
    [pages]
  );

  const results: SearchResult[] = useMemo(
    () =>
      query
        ? fuse.search(query).map((res) => ({
            ...res.item,
            matches: res.matches,
          }))
        : [],
    [query, fuse]
  );

  const getContentSnippet = useMemo(
    () => (content: string, matches: readonly FuseMatch[] | undefined) => {
      if (!matches || !query) return null;

      const match = matches.find((m) => m.key === "content");
      if (!match) return null;

      const { indices } = match;
      if (indices.length === 0) return null;

      const [start, end] = indices[0];
      const snippetStart = Math.max(0, start - 50);
      const snippetEnd = Math.min(content.length, end + 50);
      let snippet = content.slice(snippetStart, snippetEnd);

      if (snippetStart > 0) snippet = "..." + snippet;
      if (snippetEnd < content.length) snippet = snippet + "...";

      return snippet;
    },
    [query]
  );

  return (
    <>
      <div className="mb-8">
        <Input
          placeholder="Search pages..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-[56px]"
        />
      </div>

      {query && results.length === 0 && (
        <div className="text-center text-gray-500">No results found.</div>
      )}

      {query && results.length > 0 && (
        <h2 className="heading-2 mb-6 text-blue-300">Results</h2>
      )}

      <div className="space-y-4">
        {results.map((page) => {
          const contentMatches = page.matches?.filter(
            (m) => m.key === "content"
          );
          const contentString = getPageContent(page);

          return (
            <LinkButton
              field={{
                url: page.url || undefined,
                uid: page.uid || undefined,
                link_type: "Document",
                id: page.id,
                type: page.type,
                tags: [],
                lang: "en-us",
              }}
              key={page.id}
              className="h-full w-full cursor-pointer justify-start rounded-lg border border-blue-300/15 bg-white p-4 text-black hover:border-blue-300/50 hover:bg-transparent hover:shadow-sm"
            >
              <div className="flex flex-col items-start gap-2">
                <span className="heading-5 text-gray-700">
                  {getPageTitle(page)}
                </span>
                {query &&
                  contentString &&
                  getContentSnippet(contentString, contentMatches) && (
                    <span
                      className="body-md line-clamp-2 text-gray-500"
                      dangerouslySetInnerHTML={{
                        __html:
                          getContentSnippet(contentString, contentMatches) ||
                          "",
                      }}
                    />
                  )}
              </div>
            </LinkButton>
          );
        })}
      </div>
    </>
  );
};
