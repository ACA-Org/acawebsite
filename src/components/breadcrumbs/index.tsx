"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { labelFormatter } from "@/lib/strting";
import { usePathname } from "next/navigation";
import { useAtomValue } from "jotai";
import { pathMapAtom } from "@/app/atoms/pathMapAtom";
import { pageInfoAtom } from "@/app/atoms/pageInfoAtom";

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathMap = useAtomValue(pathMapAtom);
  const pages = useAtomValue(pageInfoAtom);

  if (!pathname || !pathMap) return null;

  // Remove trailing slash and split the path
  const segments = pathname.replace(/\/$/, "").split("/").filter(Boolean);

  // Create the breadcrumb items with proper links
  const items = segments.map((segment, index) => {
    // Handle predefined pages
    if (segment === "contact") {
      return {
        href: "/contact",
        label: "Contact Us",
      };
    }
    if (segment === "search") {
      return {
        href: "/search",
        label: "Search",
      };
    }
    if (segment === "locations") {
      return {
        href: "/locations",
        label: "Locations",
      };
    }
    if (segment === "privacy-policy") {
      return {
        href: "/privacy-policy",
        label: "Privacy Policy",
      };
    }

    // For regular pages, find the page in our pages list
    const href = `/${segments.slice(0, index + 1).join("/")}`;

    const page = pages.find((p) => {
      const pagePath = pathMap.get(p.id);
      return pagePath === href;
    });

    const label =
      page?.data?.pageTitle ||
      segment
        .split("_")
        .join("-")
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return {
      href,
      label,
    };
  });

  return (
    <nav aria-label="Breadcrumb" className="hidden py-2 lg:block">
      <ol className="flex items-center space-x-2">
        <li className="flex gap-2">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
          >
            <span className="body-sm">Home</span>
          </Link>
          <ChevronRight className="text-muted-foreground h-4 w-4" />
        </li>
        {items.map((item, index) => {
          const isLast = index === items?.length - 1;

          if (isLast)
            return (
              <li
                key={item.href}
                className="body-sm hover:text-foreground text-foreground flex items-center space-x-2 font-medium transition-colors"
              >
                {labelFormatter(item.label)}
              </li>
            );

          return (
            <li key={item.href} className="flex items-center space-x-2">
              <Link
                href={item.href}
                className={
                  "body-sm hover:text-foreground text-muted-foreground transition-colors"
                }
              >
                {labelFormatter(item.label)}
              </Link>

              <ChevronRight className="text-muted-foreground h-4 w-4" />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
