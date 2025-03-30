"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import ACA from "@/app/images/aca-blue-gold.png";
import { IconMenu } from "./components/IconMenu";
import { NavMenu } from "./components/NavMenu";
import { MenuItemProps } from "@/slices/MenuItem";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "../ui/navigation-menu";

const Header = ({
  data,
}: {
  data: {
    slices: MenuItemProps[];
  };
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsCollapsed(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full bg-[#f9f9f9] transition-all duration-300 ease-in-out z-50 border-b-[rgba(0,95,150,0.08)] border-b border-solid",
        isCollapsed ? "py-4" : "py-8 border"
      )}
    >
      <NavigationMenu className="w-full">
        <div className="relative px-9 flex items-center justify-between w-full">
          <Link
            href="/"
            className="flex flex-col items-start justify-center transition-all duration-300"
          >
            <img
              className={cn(
                "object-cover transition-all duration-300",
                isCollapsed ? "w-[68px] h-[26px]" : "w-[114.78px] h-11"
              )}
              alt="ACA logo"
              src={ACA.src}
            />
          </Link>
          <NavMenu data={data} />

          <IconMenu />
        </div>
      </NavigationMenu>
    </header>
  );
};

export default Header;
