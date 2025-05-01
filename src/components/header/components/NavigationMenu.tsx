import React, { useEffect, useState } from "react";
import { MenuItemProps } from "@/slices/MenuItem";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { ArrowRight } from "@/icons/ArrowRight";
import { Link2 } from "lucide-react";
import { CaretDown } from "@/icons/CaretDown";
import { cn } from "@/lib/utils";
import SVG from "react-inlinesvg";
import { FilledContentRelationshipField } from "@prismicio/client";

export interface NavigationMenuProps {
  className?: string;
  slices: MenuItemProps[];
}

export function NavigationMenu({ className, slices }: NavigationMenuProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeSlice, setActiveSlice] = useState<MenuItemProps | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMobileItem, setActiveMobileItem] = useState<number | null>(null);

  // const closeMobileMenu = () => {
  //   setIsMobileOpen(false);
  //   setActiveMobileItem(null);
  // };

  useEffect(() => {
    if (activeItem === null) return setActiveSlice(null);
    setActiveSlice(slices[activeItem]);
  }, [activeItem, slices]);

  return (
    <nav onMouseLeave={() => setActiveItem(null)} className="z-40">
      {/* Desktop Nav */}
      <div
        className={cn(
          className,
          "hidden relative xl:absolute xl:top-1/2 xl:left-1/2 xl:-translate-1/2 xl:p-8 lg:block"
        )}
      >
        <div className="relative">
          <div className="flex justify-center">
            <ul className="flex items-center gap-8 p-2 w-full justify-center">
              {slices.map(
                ({ primary: { tierOneLink, tierTwoMenuItems } }, index) => (
                  <li key={index} className="relative">
                    <PrismicNextLink
                      linkResolver={(i) => `/${i.uid}`}
                      field={tierOneLink}
                      onMouseEnter={() => setActiveItem(index)}
                      className="group/link body-sm text-blue-300 hover:underline hover:text-blue-200 hover:bg-transparent flex gap-2"
                    >
                      <span className="whitespace-nowrap">
                        {tierOneLink.text}
                      </span>
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
            className={`absolute top-full left-1/2 -translate-x-1/2 w-fit mt-2 bg-white rounded-lg shadow-[0px_4px_48px_0px_rgba(0,0,0,0.12)] transition-all duration-200 ${activeSlice
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
                      linkResolver={(i) => {
                        return `/${(activeSlice.primary.tierOneLink as FilledContentRelationshipField).uid}/${i.uid}`;
                      }}
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

                        <div className="flex flex-col justify-center items-start text-gray-300 w-max">
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
                      {/* <PrismicNextImage
                      field={activeSlice?.primary.featuredMenuImage}
                      className="w-full h-full object-cover peer"
                    /> */}
                      <PrismicNextImage
                        field={activeSlice?.primary.featuredMenuImage}
                        className="w-full h-full object-cover peer opacity-0 transition-opacity duration-300"
                        onLoad={(e) => {
                          const el = e.currentTarget;
                          el.classList.remove("opacity-0");
                          el.classList.add("opacity-100");
                          el.nextElementSibling?.classList.add("hidden"); // hide the skeleton
                        }}
                      />
                      <div className="absolute inset-0 bg-gray-200 animate-pulse pointer-events-none" />
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
      </div>

      {/* Mobile Nav */}
      <div className="relative">
        <button
          className="lg:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-black mb-1"></span>
          <span className="block w-6 h-0.5 bg-black mb-1"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>

        <div
          className={cn(
            "fixed top-0 left-0 right-0 bg-white z-40 overflow-hidden transition-transform duration-300 lg:hidden",
            isMobileOpen ? "translate-y-[60px]" : "-translate-y-full"
          )}
        >
          <ul className="flex flex-col p-6 space-y-4">
            {slices.map(
              ({ primary: { tierOneLink, tierTwoMenuItems } }, index) => (
                <li key={index}>
                  <button
                    className="w-full text-left text-lg font-semibold flex justify-between items-center"
                    onClick={() => setActiveMobileItem(index)}
                  >
                    {tierOneLink.text}
                    {tierTwoMenuItems?.length > 0 && (
                      <CaretDown className="w-4 h-4 stroke-blue-300" />
                    )}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>

        {activeMobileItem !== null && (
          <div className="fixed inset-0 bg-white z-50 transition-transform duration-300 transform translate-x-0 lg:hidden">
            <div className="p-6 flex flex-col gap-4">
              <button
                onClick={() => setActiveMobileItem(null)}
                className="text-blue-300 text-sm mb-4"
              >
                ← Back to menu
              </button>
              {slices[activeMobileItem]?.primary.tierTwoMenuItems?.map(
                (item, i) => (
                  <PrismicNextLink
                    key={i}
                    field={item.tierTwoMenuLink}
                    className="text-gray-700 text-base block"
                  >
                    {item.tierTwoMenuLink.text}
                  </PrismicNextLink>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
