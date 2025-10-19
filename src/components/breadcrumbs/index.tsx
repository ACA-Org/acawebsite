"use client";

import { ChevronRight } from "lucide-react";
import { labelFormatter } from "@/lib/strting";
import { usePathname } from "next/navigation";
import { useAtomValue } from "jotai";
import { pathMapAtom } from "@/app/atoms/pathMapAtom";
import { TransitionLink } from "../ui/button";

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathMap = useAtomValue(pathMapAtom);

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
    if (segment === "privacy_policy") {
      return {
        href: "/privacy_policy",
        label: "Privacy Policy",
      };
    }
    if (segment === "newsletters") {
      return {
        href: "/newsletters",
        label: "Newsletters",
      };
    }

    // For regular pages, construct the href and use segment for label
    const href = `/${segments.slice(0, index + 1).join("/")}`;

    // Format the segment as a label
    const label = segment
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
          <TransitionLink
            href="/"
            className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
          >
            <span className="body-sm">Home</span>
          </TransitionLink>
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
              <TransitionLink
                href={item.href}
                className={
                  "body-sm hover:text-foreground text-muted-foreground transition-colors"
                }
              >
                {labelFormatter(item.label)}
              </TransitionLink>

              <ChevronRight className="text-muted-foreground h-4 w-4" />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
