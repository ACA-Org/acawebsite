"use client";

import { useState, useMemo } from "react";
import {
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandDialog,
} from "@/components/ui/command";
import Fuse from "fuse.js";
import { useAtom, useAtomValue } from "jotai";
import { searchDialogAtom } from "../atoms/searchDialogAtom";
import { asText } from "@prismicio/richtext";
import { pageInfoAtom } from "../atoms/pageInfoAtom";
import { LinkButton } from "@/components/ui/button";

type FuseMatch = {
  indices: [number, number][];
  key: string;
};

export const SearchDialog = () => {
  const pages = useAtomValue(pageInfoAtom);
  const [open, setOpen] = useAtom(searchDialogAtom);
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
        : pages,
    [query, fuse, pages]
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
    <div className="mx-auto mt-8 max-w-md">
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages..." onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
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
              <CommandItem
                key={page.id}
                value={page.data.pageTitle || ""}
                asChild
              >
                <LinkButton
                  field={{
                    // ...page,
                    url: page.url || undefined,
                    uid: page.uid || undefined,
                    link_type: "Document",
                    id: page.id,
                    type: "page",
                    tags: [],
                    lang: "en-us",
                  }}
                  className="h-full w-full cursor-pointer justify-start bg-transparent text-black"
                  onClick={() => {
                    setOpen(false);
                  }}
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
              </CommandItem>
            );
          })}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

