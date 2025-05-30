"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import Fuse from "fuse.js";
import { asText } from "@prismicio/richtext";
import { useAtomValue } from "jotai";

import { LinkButton } from "@/components/ui/button";
import { pageInfoAtom } from "@/app/atoms/pageInfoAtom";

type FuseMatch = {
  indices: [number, number][];
  key: string;
};

export const Search = () => {
  const pages = useAtomValue(pageInfoAtom);
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(pages, {
        keys: [
          { name: "title", getFn: (page) => page.data.pageTitle || "" },
          {
            name: "content",
            getFn: (page) => {
              if (
                !(page?.data as any)?.pageContent &&
                !(page?.data as any)?.pageTextContent
              )
                return "";

              return asText(
                (page?.data as any)?.pageContent ||
                (page?.data as any)?.pageTextContent
              );
            },
          },
        ],
        threshold: 0.5,
        includeMatches: true,
        isCaseSensitive: false,
      }),
    [pages]
  );

  const results = useMemo(
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
    () => (content: string, matches: FuseMatch[] | undefined) => {
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
          className="h-12"
        />
      </div>

      {query && results.length === 0 && (
        <div className="text-center text-gray-500">No results found.</div>
      )}

      {(query && results.length > 0) && (
        <h2 className="heading-2 mb-6 text-blue-300">Results</h2>
      )}

      <div className="space-y-4">
        {results.map((page) => {
          const contentMatches = (page as any).matches?.filter(
            (m: FuseMatch) => m.key === "content"
          );
          let contentString = "";

          if (
            (page?.data as any)?.pageContent ||
            (page?.data as any)?.pageTextContent
          ) {
            contentString += asText(
              (page?.data as any)?.pageContent ||
              (page?.data as any)?.pageTextContent
            );
          }

          return (
            <div
              key={page.id}
              className="rounded-sm border bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <LinkButton
                field={{
                  url: page.url || undefined,
                  uid: page.uid || undefined,
                  link_type: "Document",
                  id: page.id,
                  type: "page",
                  tags: [],
                  lang: "en-us",
                }}
                className="h-full w-full cursor-pointer justify-start bg-transparent text-black hover:text-white"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-medium">
                    {page.data.pageTitle || ""}
                  </span>
                  {query && contentString && (
                    <span
                      className="text-muted-foreground line-clamp-2 text-sm"
                      dangerouslySetInnerHTML={{
                        __html:
                          getContentSnippet(contentString, contentMatches) ||
                          "",
                      }}
                    />
                  )}
                </div>
              </LinkButton>
            </div>
          );
        })}
      </div>
    </>
  );
};
