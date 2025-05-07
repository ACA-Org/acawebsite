import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { labelFormatter } from "@/lib/strting";
import { createClient } from "@/prismicio";

interface BreadcrumbsProps {
  path: string;
}

export async function Breadcrumbs({ path }: BreadcrumbsProps) {
  const client = createClient();
  // Remove trailing slash and split the path
  const segments = path.replace(/\/$/, "").split("/").filter(Boolean);

  // Create the breadcrumb items with proper links
  const items = await Promise.all(
    segments.map(async (segment, index) => {
      const page = await client.getByUID(
        index === 0
          ? "tierOnePage"
          : index === 1
            ? "tierTwoPage"
            : "tierThreePage",
        segment
      );

      const href = `/${segments.slice(0, index + 1).join("/")}`;
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
    })
  );

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

