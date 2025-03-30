import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { NavItem } from "./NavItem";
import { NavMenuLink } from "./NavMenuLink";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { ArrowRight } from "@/icons/ArrowRight";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

/**
 * Props for `MenuItem`.
 */
export type MenuItemProps = SliceComponentProps<Content.MenuItemSlice>["slice"];

/**
 * Component for "MenuItem" Slices.
 */

const MenuItem: FC<MenuItemProps> = (props) => {
  const {
    primary: {
      featuredMenuImage: featuredImage,
      featuredMenuLink: featuredLink,
      tierOneLink: link,
      tierTwoMenuItems,
    },
  } = props;

  return (
    <NavigationMenuItem
      key={props.id}
      data-slice-type={props.slice_type}
      data-slice-variation={props.variation}
    >
      <NavigationMenuTrigger>
        <NavItem link={link} hasChildren={tierTwoMenuItems?.length > 0} />
      </NavigationMenuTrigger>
      <NavigationMenuContent className="inline-flex p-12 items-start gap-8 w-max align-right">
        <div className="grid grid-cols-2 gap-8 w-max">
          {tierTwoMenuItems.map((i, index) => (
            <NavMenuLink key={`${i.tierTwoMenuLink.text}-${index}`} {...i} />
          ))}
        </div>
        {featuredLink.text && (
          <PrismicNextLink
            field={featuredLink}
            className="flex flex-col items-start gap-4 pl-8 group/link"
          >
            <p className="self-stretch text-gray-300 group-hover/link:text-blue-200">
              {featuredLink.text}
            </p>
            <div className="relative w-[200px] h-[113px] overflow-clip group rounded-lg">
              <PrismicNextImage
                field={featuredImage}
                className="w-full h-full object-cover peer"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#0f2d52e6] h-full transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 flex items-center justify-center gap-3">
                <span className="text-white leading-4.5 text-lg">
                  View Item
                </span>

                <ArrowRight
                  style={{
                    height: "15px",
                    width: "17px",
                  }}
                  className="stroke-white stroke-1"
                />
              </div>
            </div>
          </PrismicNextLink>
        )}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default MenuItem;
