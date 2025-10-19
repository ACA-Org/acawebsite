"use client";

import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { TransitionLink } from "../ui/button";

export function BackButton() {
  const pathname = usePathname();

  if (!pathname) return null;

  // Get the parent page path by removing the last segment
  const segments = pathname.split("/").filter(Boolean);

  // Don't show back button if we're at the top level
  if (segments.length <= 1) return null;

  const parentPath = `/${segments.slice(0, -1).join("/")}`;

  // Format the parent segment as a label
  const parentSegment = segments[segments.length - 2];
  const parentLabel = parentSegment
    .split("_")
    .join("-")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <TransitionLink
      href={parentPath}
      className="flex items-center gap-2 text-blue-300 transition-colors hover:text-blue-400 md:hidden"
    >
      <ChevronLeft className="h-5 w-5" />
      <p>Back to {parentLabel}</p>
    </TransitionLink>
  );
}
