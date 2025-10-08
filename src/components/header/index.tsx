"use client";

import React, { useEffect, useState } from "react";
import { IconMenu } from "./components/IconMenu";
import { MenuItemProps } from "@/slices/MenuItem";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "./components/NavigationMenu";
import { ACALogoColor } from "@/logos/ACALogoColor";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./components/MobileMenu";
import { TransitionLink } from "../ui/button";
import Image from "next/image";

import ACAFullLogo from "../../../public/aca-logo-full-color.png";

const Header = ({
  data,
}: {
  data: {
    slices: MenuItemProps[];
  };
}) => {
  const pathName = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsCollapsed(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathName]);

  return (
    <header className={"fixed top-0 right-0 left-0 z-100 w-full"}>
      <div
        className={cn(
          "relative z-100 flex w-full justify-between border-b border-b-[rgba(0,95,150,0.08)] bg-white px-9 transition-all duration-300 ease-in-out",
          isCollapsed
            ? "items-center py-4"
            : "border-b-0 py-8 max-lg:py-4 max-md:items-center"
        )}
      >
        <TransitionLink
          href="/"
          className="flex items-start justify-start text-left transition-all duration-300"
          aria-label="American Correctional Association - Return to Homepage"
        >
          <ACALogoColor
            className={cn(
              "object-cover transition-all duration-500",
              isCollapsed ? "h-auto w-[68px]" : "h-auto w-[68px] md:hidden"
            )}
          />
          <Image
            src={ACAFullLogo.src}
            alt="ACA, Founded 1870. American Correctional Association. Advance. Connect. Achieve."
            width={300}
            height={200}
            className={cn(
              "transition-all duration-500",
              isCollapsed ? "hidden" : "hidden md:block"
            )}
          />
        </TransitionLink>

        <NavigationMenu slices={data.slices} />

        <IconMenu />
        <button
          className="relative h-4 w-6 xl:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`absolute top-0 left-0 block h-0.5 w-6 transform bg-black transition-all duration-300 ${isMobileOpen ? "translate-y-2 rotate-45" : ""}`}
          ></span>
          <span
            className={`absolute top-2 left-0 block h-0.5 w-6 transform bg-black transition-all duration-300 ${isMobileOpen ? "translate-x-full opacity-0" : "translate-x-0"}`}
          ></span>
          <span
            className={`absolute top-4 left-0 block h-0.5 w-6 transform bg-black transition-all duration-300 ${isMobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          ></span>
        </button>
      </div>

      <MobileMenu
        slices={data.slices}
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </header>
  );
};

export default Header;
