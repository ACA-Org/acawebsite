import React, { useEffect, useState } from "react";
import { MenuItemProps } from "@/slices/MenuItem";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { ArrowRight } from "@/icons/ArrowRight";
import { Link2 } from "lucide-react";
import { CaretDown } from "@/icons/CaretDown";
import { cn } from "@/lib/utils";
import SVG from "react-inlinesvg";

export interface NavigationMenuProps {
  className?: string;
  slices: MenuItemProps[];
}

export function NavigationMenu({ className, slices }: NavigationMenuProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeSlice, setActiveSlice] = useState<MenuItemProps | null>(null);

  useEffect(() => {
    if (activeItem === null) return setActiveSlice(null);
    setActiveSlice(slices[activeItem]);
  }, [activeItem, slices]);

  return (
    <nav
      onMouseLeave={() => setActiveItem(null)}
      className={cn(className, "absolute top-1/2 left-1/2 -translate-1/2 p-8")}
    >
      <div className="relative">
        <div className="flex justify-center">
          <ul className="flex items-center gap-8 p-2 w-full justify-center">
            {slices.map(
              ({ primary: { tierOneLink, tierTwoMenuItems } }, index) => (
                <li key={index} className="relative">
                  <PrismicNextLink
                    field={tierOneLink}
                    onMouseEnter={() => setActiveItem(index)}
                    className="group/link body-sm text-blue-300 hover:underline hover:text-blue-200 hover:bg-transparent flex gap-2"
                  >
                    {tierOneLink.text}
                    {tierTwoMenuItems?.length > 0 && (
                      <CaretDown
                        className={cn(
                          "w-2 h-auto transition-transform stroke-blue-300 group-hover/link:stroke-blue-200 group-hover/link:rotate-180"
                        )}
                      />
                    )}
                  </PrismicNextLink>
                </li>
              )
            )}
          </ul>
        </div>

        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 w-fit mt-2 bg-white rounded-lg shadow-[0px_4px_48px_0px_rgba(0,0,0,0.12)] transition-all duration-200 ${
            activeSlice
              ? "opacity-100 translate-y-0 pointer-events-auto animate-slide-down-fade"
              : "opacity-0 -translate-y-2 pointer-events-none animate-slide-up-fade"
          }`}
        >
          {activeSlice && (
            <div
              key={activeSlice.id}
              className="animate-slide-in-right inline-flex p-12 items-start gap-8 w-max align-right"
            >
              <div className="grid grid-cols-2 gap-8 w-max">
                {activeSlice?.primary.tierTwoMenuItems.map((i, index) => (
                  <PrismicNextLink
                    key={`${i.tierTwoMenuLink.text}-${index}`}
                    field={i.tierTwoMenuLink}
                    className="w-max col-span-1 group"
                  >
                    <span className="flex h-9 items-center gap-3 pr-3 w-max">
                      <span className="flex items-center justify-center w-9 h-9 p-2 bg-gray-200 group-hover:bg-blue-300 transition-colors rounded-sm">
                        {i.tierTwoMenuIcon?.url ? (
                          <SVG
                            src={i.tierTwoMenuIcon.url}
                            className="[&>path]:!fill-gray-300 [&>path]:group-hover:!fill-white"
                          />
                        ) : (
                          <Link2 className="stroke-gray-300 group-hover:stroke-white" />
                        )}
                      </span>

                      <div className="flex flex-col justify-center items-start gap-1 text-gray-300 w-max">
                        <p className="group-hover:text-blue-200 transition-colors">
                          {i.tierTwoMenuLink.text}
                        </p>
                        <p className="text-xs">{i.tierTwoMenuDesc}</p>
                      </div>
                    </span>
                  </PrismicNextLink>
                ))}
              </div>
              {activeSlice?.primary.featuredMenuLink.text && (
                <PrismicNextLink
                  field={activeSlice?.primary.featuredMenuLink}
                  className="flex flex-col items-start gap-4 pl-8 group/link"
                >
                  <p className="self-stretch text-gray-300 group-hover/link:text-blue-200">
                    {activeSlice?.primary.featuredMenuLink.text}
                  </p>
                  <div className="relative w-[200px] h-[113px] overflow-clip group rounded-lg">
                    <PrismicNextImage
                      field={activeSlice?.primary.featuredMenuImage}
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
