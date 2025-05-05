import React, { useEffect, useState } from "react";
import { MenuItemProps } from "@/slices/MenuItem";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { ArrowRight } from "@/icons/ArrowRight";
import { Link2 } from "lucide-react";
import { CaretDown } from "@/icons/CaretDown";
import { cn } from "@/lib/utils";
import SVG from "react-inlinesvg";
import { useAtomValue } from "jotai";
import { pathMapAtom } from "@/app/atoms/pathMapAtom";

export interface NavigationMenuProps {
  className?: string;
  slices: MenuItemProps[];
}

export function NavigationMenu({ className, slices }: NavigationMenuProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeSlice, setActiveSlice] = useState<MenuItemProps | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMobileItem, setActiveMobileItem] = useState<number | null>(null);
  const pathMap = useAtomValue(pathMapAtom);

  useEffect(() => {
    if (activeItem === null) return setActiveSlice(null);
    setActiveSlice(slices[activeItem]);
  }, [activeItem, slices]);

  return (
    <nav
      onMouseLeave={() => setActiveItem(null)}
      className="relative z-40 xl:absolute xl:top-1/2 xl:left-1/2 xl:-translate-1/2 xl:p-8"
    >
      <div className={cn(className, "hidden lg:block")}>
        <div className="relative">
          <div className="flex justify-center">
            <ul className="flex w-full items-center justify-center gap-8 p-2">
              {slices.map(
                ({ primary: { tierOneLink, tierTwoMenuItems } }, index) => (
                  <li key={index} className="relative">
                    <PrismicNextLink
                      linkResolver={(doc) =>
                        pathMap?.get(doc.id) || `/${doc.uid}`
                      }
                      field={tierOneLink}
                      onMouseEnter={() => setActiveItem(index)}
                      className="group/link body-sm flex gap-2 text-blue-300 hover:bg-transparent hover:text-blue-200 hover:underline"
                    >
                      <span className="whitespace-nowrap">
                        {tierOneLink.text}
                      </span>
                      {tierTwoMenuItems?.length > 0 && (
                        <CaretDown
                          className={cn(
                            "h-auto w-2 stroke-blue-300 transition-transform group-hover/link:rotate-180 group-hover/link:stroke-blue-200"
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
            className={`absolute top-full left-1/2 mt-2 w-fit -translate-x-1/2 rounded-lg bg-white shadow-[0px_4px_48px_0px_rgba(0,0,0,0.12)] transition-all duration-200 ${
              activeSlice
                ? "animate-slide-down-fade pointer-events-auto translate-y-0 opacity-100"
                : "animate-slide-up-fade pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            {activeSlice && (
              <div
                key={activeSlice.id}
                className="animate-slide-in-right align-right inline-flex w-max items-start gap-8 p-12"
              >
                <div className="grid w-max grid-cols-2 gap-8">
                  {activeSlice?.primary.tierTwoMenuItems.map((i, index) => (
                    <PrismicNextLink
                      key={`${i.tierTwoMenuLink.text}-${index}`}
                      field={i.tierTwoMenuLink}
                      linkResolver={(doc) =>
                        pathMap?.get(doc.id) || `/${doc.uid}`
                      }
                      className="group col-span-1 w-max"
                    >
                      <span className="flex h-9 w-max items-center gap-3 pr-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-gray-200 p-2 transition-colors group-hover:bg-blue-300">
                          {i.tierTwoMenuIcon?.url ? (
                            <SVG
                              src={i.tierTwoMenuIcon.url}
                              className="[&>path]:!fill-gray-300 [&>path]:group-hover:!fill-white"
                            />
                          ) : (
                            <Link2 className="stroke-gray-300 group-hover:stroke-white" />
                          )}
                        </span>

                        <div className="flex w-max flex-col items-start justify-center text-gray-300">
                          <p className="transition-colors group-hover:text-blue-200">
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
                    linkResolver={(doc) =>
                      pathMap?.get(doc.id) || `/${doc.uid}`
                    }
                    className="group/link flex flex-col items-start gap-4 pl-8"
                  >
                    <p className="self-stretch text-gray-300 group-hover/link:text-blue-200">
                      {activeSlice?.primary.featuredMenuLink.text}
                    </p>
                    <div className="group relative h-[113px] w-[200px] overflow-clip rounded-lg">
                      <PrismicNextImage
                        field={activeSlice?.primary.featuredMenuImage}
                        className="peer h-full w-full object-cover opacity-0 transition-opacity duration-300"
                        onLoad={(e) => {
                          const el = e.currentTarget;
                          el.classList.remove("opacity-0");
                          el.classList.add("opacity-100");
                          el.nextElementSibling?.classList.add("hidden"); // hide the skeleton
                        }}
                      />
                      <div className="pointer-events-none absolute inset-0 animate-pulse bg-gray-200" />
                      <div className="absolute right-0 bottom-0 left-0 flex h-full translate-y-full transform items-center justify-center gap-3 bg-[#0f2d52e6] transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                        <span className="text-lg leading-4.5 text-white">
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

      <button
        className="mt-2 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        <span className="mb-1 block h-0.5 w-6 bg-black"></span>
        <span className="mb-1 block h-0.5 w-6 bg-black"></span>
        <span className="block h-0.5 w-6 bg-black"></span>
      </button>

      <div className="relative -z-1">
        <div
          className={cn(
            "fixed top-0 right-0 left-0 -z-1 overflow-hidden bg-white shadow-lg transition-transform duration-300 lg:hidden",
            isMobileOpen ? "translate-y-[64px]" : "-translate-y-full"
          )}
        >
          <ul className="flex flex-col space-y-4 p-6">
            {slices.map(
              ({ primary: { tierOneLink, tierTwoMenuItems } }, index) => (
                <li key={index}>
                  <button
                    className="flex w-full items-center justify-between text-left text-lg font-medium text-blue-300"
                    onClick={() => setActiveMobileItem(index)}
                  >
                    {tierOneLink.text}
                    {tierTwoMenuItems?.length > 0 && (
                      <CaretDown className="h-auto w-3 -rotate-90 stroke-blue-300" />
                    )}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>

        {activeMobileItem !== null && (
          <div className="fixed inset-0 top-[64px] z-50 translate-x-0 transform bg-white transition-transform duration-300 lg:hidden">
            <div className="flex flex-col gap-4 p-6">
              <button
                onClick={() => setActiveMobileItem(null)}
                className="mb-4 flex gap-3 text-sm text-blue-300"
              >
                <CaretDown className="h-auto w-3 rotate-90 items-center stroke-blue-300" />
                <span className="mt-[2px]">Back to menu</span>
              </button>
              {slices[activeMobileItem]?.primary.tierTwoMenuItems?.map(
                (item, i) => (
                  <PrismicNextLink
                    key={i}
                    field={item.tierTwoMenuLink}
                    linkResolver={(doc) =>
                      pathMap?.get(doc.id) || `/${doc.uid}`
                    }
                    className="block text-base text-gray-700"
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
