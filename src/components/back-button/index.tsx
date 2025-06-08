"use client";

import { useAtomValue } from "jotai";
import { pathMapAtom } from "@/app/atoms/pathMapAtom";
import { pageInfoAtom } from "@/app/atoms/pageInfoAtom";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { TransitionLink } from "../ui/button";

export function BackButton() {
  const pathname = usePathname();
  const pathMap = useAtomValue(pathMapAtom);
  const pages = useAtomValue(pageInfoAtom);

  if (!pathname || !pathMap) return null;

  // Get the parent page path by removing the last segment
  const segments = pathname.split("/").filter(Boolean);
  const parentPath = `/${segments.slice(0, -1).join("/")}`;

  // Find the parent page in our pages list
  const parentPage = pages.find((p) => {
    const pagePath = pathMap.get(p.id);
    return pagePath === parentPath;
  });

  if (!parentPage) return null;

  return (
    <TransitionLink
      href={parentPath}
      className="flex items-center gap-2 text-blue-300 transition-colors hover:text-blue-400 md:hidden"
    >
      <ChevronLeft className="h-5 w-5" />
      <p>Go to {parentPage.data.pageTitle}</p>
    </TransitionLink>
  );
}
