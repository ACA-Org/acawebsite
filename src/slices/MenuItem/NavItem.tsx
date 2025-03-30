import { CaretDown } from "@/icons/CaretDown";
import { cn } from "@/lib/utils";
import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

export const NavItem = ({
  link,
  hasChildren = false,
}: {
  link: LinkField;
  hasChildren?: boolean;
}) => {
  return (
    <PrismicNextLink
      field={link}
      className="group/link body-sm text-blue-300 hover:underline hover:text-blue-200 hover:bg-transparent flex gap-2"
    >
      {link.text}
      {hasChildren && (
        <CaretDown
          className={cn(
            "w-2 h-auto transition-transform stroke-blue-300 group-hover/link:stroke-blue-200 group-hover/link:rotate-180"
          )}
        />
      )}
    </PrismicNextLink>
  );
};
