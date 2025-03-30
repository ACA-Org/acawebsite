import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Link2 } from "lucide-react";
import { Simplify } from "../../../prismicio-types";

type NavMenuLinkProps =
  Simplify<Content.MenuItemSliceDefaultPrimaryTierTwoMenuItemsItem>;

export const NavMenuLink = (props: NavMenuLinkProps) => {
  const {
    tierTwoMenuLink: link,
    tierTwoMenuDesc: desc,
    tierTwoMenuIcon: icon,
  } = props;
  return (
    <PrismicNextLink field={link} className="w-max col-span-1 group">
      <span className="flex h-9 items-center gap-3 pr-3 w-max">
        <span className="flex items-center justify-center w-9 h-9 p-2 bg-gray-200 group-hover:bg-blue-300 transition-colors rounded-sm stroke-gray-300 text-gray-300 group-hover:stroke-white group-hover:text-white">
          {icon?.url ? <PrismicNextImage field={icon} /> : <Link2 />}
        </span>

        <div className="flex flex-col justify-center items-start gap-1 text-gray-300 w-max">
          <p className="group-hover:text-blue-200 transition-colors">
            {link.text}
          </p>
          <p className="text-xs">{desc}</p>
        </div>
      </span>
    </PrismicNextLink>
  );
};
