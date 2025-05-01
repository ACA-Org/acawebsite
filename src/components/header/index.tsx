"use client";

import React, { useEffect, useState } from "react";
import { IconMenu } from "./components/IconMenu";
import { MenuItemProps } from "@/slices/MenuItem";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "./components/NavigationMenu";
import { ACALogoColor } from "@/logos/ACALogoColor";
import { usePathname } from "next/navigation";

const Header = ({
  data,
}: {
  data: {
    slices: MenuItemProps[];
  };
}) => {
  const pathName = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsCollapsed(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathName]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-100 w-full border-b border-b-[rgba(0,95,150,0.08)] bg-[#f9f9f9] transition-all duration-300 ease-in-out",
        isCollapsed ? "py-4" : "border-b py-8 max-lg:py-4"
      )}
    >
      <div className="relative flex w-full items-center justify-between px-9">
        <Link
          href="/"
          className="flex flex-col items-start justify-center transition-all duration-300"
        >
          <ACALogoColor
            className={cn(
              "object-cover transition-all duration-300",
              isCollapsed
                ? "h-[26px] w-[68px]"
                : "h-11 h-[26px] w-[114.78px] max-lg:w-[68px]"
            )}
          />
        </Link>

        <NavigationMenu slices={data.slices} />

        <IconMenu />
      </div>
    </header>
  );
};

export default Header;
