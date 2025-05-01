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
        "fixed top-0 left-0 right-0 w-full bg-[#f9f9f9] transition-all duration-300 ease-in-out z-100 border-b-[rgba(0,95,150,0.08)] border-b border-solid",
        isCollapsed ? "py-4" : "py-8 border max-lg:py-4"
      )}
    >
      <div className="relative px-9 flex items-center justify-between w-full">
        <Link
          href="/"
          className="flex flex-col items-start justify-center transition-all duration-300"
        >
          <ACALogoColor
            className={cn(
              "object-cover transition-all duration-300",
              isCollapsed
                ? "w-[68px] h-[26px]"
                : "w-[114.78px] h-11 max-lg:w-[68px] h-[26px]"
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
