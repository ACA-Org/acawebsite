"use client";

import { ExpandingIcon } from "./ExpandingIcon";
// import { SuitcaseIcon } from "@/icons/SuitcaseIcon";
// import { MailIcon } from "@/icons/MailIcon";
import { SearchIcon } from "@/icons/SearchIcon";
// import { ShoppingCart } from "@/icons/ShoppingCart";
import { useEffect, useRef, useState } from "react";
import { UserIcon } from "@/icons/UserIcon";
import { CaretDown } from "@/icons/CaretDown";
import { cn } from "@/lib/utils";
import { TextLink } from "@/components/ui/button";
import { AuthTextLink } from "@/app/components/SignIn";
import { useSession } from "next-auth/react";
import { InfoIcon } from "lucide-react";
import { LanguageSelectorDesktop } from "./LanguageSelector";

export const IconMenu = () => {
  const [activeItem, setActiveItem] = useState("sign_in");
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const timeoutRef = useRef<number>(0);
  const user = useSession().data?.user;

  useEffect(() => {
    if (!langDropdownOpen) {
      setActiveItem("sign_in");
    }
  }, [langDropdownOpen]);

  const quickLinks = [
    {
      label: "My Account",
      value: "account",
      href: "https://aca-portal.aca.org/ACA_Member_Source/ContactLayouts/AccountPage.aspx?893b614b6538=4#893b614b6538",
      icon: InfoIcon,
      hidden: !user,
    },
    { label: "Search", value: "search", href: "/search", icon: SearchIcon },
    {
      label: "Sign In",
      value: "sign_in",
      href: "",
      icon: UserIcon,
    },
  ];

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    if (langDropdownOpen) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setActiveItem("sign_in");
    }, 150);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <>
      <div className="relative hidden w-full max-w-[200px]">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-md bg-white px-4 py-2 text-sm hover:bg-blue-50"
        >
          <span className="mt-1 block">Quick Links</span>
          <CaretDown
            className={cn("h-auto w-2 stroke-blue-300 transition-transform", {
              "rotate-180": isOpen,
            })}
          />
        </button>

        {isOpen && (
          <div className="absolute right-4 left-4 z-10 mt-2 overflow-clip rounded-md bg-white shadow-lg">
            {quickLinks.map((item) =>
              item.value === "sign_in" ? (
                <AuthTextLink
                  key={item.label}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                >
                  <item.icon className="h-auto w-4 stroke-blue-300" />
                  <span className="mt-[2px]">{item.label}</span>
                </AuthTextLink>
              ) : (
                <TextLink
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-500"
                >
                  <item.icon className="h-auto w-4 stroke-blue-300" />
                  <span className="mt-[2px]">{item.label}</span>
                </TextLink>
              )
            )}
          </div>
        )}
      </div>

      <div
        className="hidden justify-end xl:flex"
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <LanguageSelectorDesktop
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          onDropdownOpenChange={setLangDropdownOpen}
        />
        {quickLinks
          .filter((item) => !item.hidden)
          .map((item) => (
            <ExpandingIcon
              key={item.label}
              icon={item.icon}
              label={item.label}
              menuId={item.value}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              href={item.href}
            />
          ))}
      </div>
    </>
  );
};
