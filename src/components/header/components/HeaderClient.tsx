"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ACALogoColor } from "@/logos/ACALogoColor";
import { usePathname } from "next/navigation";
import { TransitionLink } from "../../ui/button";
import Image from "next/image";
import ACAFullLogo from "../../../../public/aca-logo-full-color.png";
import { MobileMenu } from "./MobileMenu";
import { MenuItemProps } from "@/slices/MenuItem";

interface HeaderClientProps {
  children: React.ReactNode;
  slices: MenuItemProps[];
}

// Create context for mobile menu state
interface MobileMenuContextType {
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenuContext = createContext<MobileMenuContextType | null>(null);

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error("useMobileMenu must be used within HeaderClient");
  }
  return context;
};

/**
 * Client component that handles scroll state and mobile menu state
 */
export function HeaderClient({ children, slices }: HeaderClientProps) {
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
    <MobileMenuContext.Provider value={{ isMobileOpen, setIsMobileOpen }}>
      <header className="fixed top-0 right-0 left-0 z-50 w-full">
        <div
          className={cn(
            "relative z-50 flex w-full justify-between border-b bg-white px-9 transition-all duration-300 ease-in-out",
            isCollapsed
              ? "items-center border-b-[rgba(0,95,150,0.08)] py-4"
              : "border-b-transparent py-8 max-lg:py-4 max-md:items-center"
          )}
        >
          <TransitionLink
            href="/"
            className="relative flex items-start justify-start text-left transition-all duration-300"
            aria-label="American Correctional Association - Return to Homepage"
          >
            <div className="relative">
              <ACALogoColor
                className={cn(
                  "object-cover transition-opacity duration-500",
                  isCollapsed
                    ? "w-[68px] opacity-100"
                    : "opacity-100 md:opacity-0",
                  "h-auto w-[120px]"
                )}
              />
              <Image
                src={ACAFullLogo.src}
                alt="ACA, Founded 1870. American Correctional Association. Advance. Connect. Achieve."
                width={300}
                height={200}
                className={cn(
                  "absolute top-0 left-0 transition-opacity duration-500",
                  isCollapsed
                    ? "pointer-events-none opacity-0"
                    : "pointer-events-auto opacity-0 md:opacity-100"
                )}
              />
            </div>
          </TransitionLink>

          {children}
        </div>

        <MobileMenu slices={slices} />
      </header>
    </MobileMenuContext.Provider>
  );
}

/**
 * Mobile menu toggle button component
 */
export function MobileMenuToggle() {
  const { isMobileOpen, setIsMobileOpen } = useMobileMenu();

  return (
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
  );
}

