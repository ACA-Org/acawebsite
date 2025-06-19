import React, { useState, useEffect, useRef } from "react";
import { MenuItemProps } from "@/slices/MenuItem";
import { cn } from "@/lib/utils";
import {
  AccordionItem,
  Accordion,
  AccordionTrigger,
  AccordionContent,
} from "@/components/right-menu/RightMenuAccordion/accordion";
import { TransitionLink } from "@/components/ui/button";
import { SuitcaseIcon } from "@/icons/SuitcaseIcon";
import { MailIcon } from "@/icons/MailIcon";
import { SearchIcon } from "@/icons/SearchIcon";
import { ShoppingCart } from "@/icons/ShoppingCart";
import { UserIcon } from "@/icons/UserIcon";
import { useAtomValue } from "jotai";
import { userAtom } from "@/app/atoms/userAtom";
import { signOut } from "next-auth/react";

interface MobileMenuProps {
  slices: MenuItemProps[];
  isOpen: boolean;
  onClose: () => void;
}

const quickLinks = [
  {
    label: "Job Bank",
    value: "job_bank",
    href: "/resources/job-bank",
    icon: SuitcaseIcon,
  },
  {
    label: "Contact Us",
    value: "contact_us",
    href: "/contact",
    icon: MailIcon,
  },
  { label: "Search", value: "search", href: "/search", icon: SearchIcon },
  {
    label: "Marketplace",
    value: "marketplace",
    href: "/marketplace",
    icon: ShoppingCart,
  },
  { label: "Sign In", value: "sign_in", href: "/auth/sigin", icon: UserIcon },
];

export function MobileMenu({ slices, isOpen, onClose }: MobileMenuProps) {
  const [open, setOpen] = useState<string | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const header = document.querySelector("header");
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        header &&
        !header.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const preventTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchmove", preventTouchMove, {
        passive: false,
      });
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchmove", preventTouchMove);
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 top-[56px] z-[98] bg-black/50 transition-opacity duration-300" />
      )}
      <div
        ref={menuRef}
        className={cn(
          "border-top fixed top-[56px] right-0 left-0 z-[99] border-b-[rgba(0,95,150,0.08)] bg-white shadow-lg transition-all duration-300",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        )}
      >
        <Accordion
          type="single"
          collapsible
          className="w-full"
          value={open}
          onValueChange={setOpen}
        >
          <div className="flex flex-col divide-y divide-gray-100/50">
            {slices.map(
              ({ primary: { tierOneLink, tierTwoMenuItems } }, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="flex flex-col"
                >
                  <AccordionTrigger className="flex w-full items-center justify-between px-6 py-4 text-left">
                    {tierOneLink.link_type === "Document" ? (
                      <TransitionLink
                        field={tierOneLink}
                        className="body-md text-blue-300"
                        onClick={() => {
                          setOpen("");
                          onClose();
                        }}
                      >
                        {tierOneLink.text}
                      </TransitionLink>
                    ) : (
                      <span className="body-md font-medium text-blue-300">
                        {tierOneLink.text}
                      </span>
                    )}
                  </AccordionTrigger>

                  {tierTwoMenuItems && (
                    <AccordionContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                      <div className="bg-gray-50/50 px-6 py-2">
                        {tierTwoMenuItems.map((item, i) => (
                          <TransitionLink
                            key={i}
                            field={item.tierTwoMenuLink}
                            className="block py-3 text-base text-gray-700"
                            onClick={() => {
                              setOpen("");
                              onClose();
                            }}
                          >
                            {item.tierTwoMenuLink.text}
                          </TransitionLink>
                        ))}
                      </div>
                    </AccordionContent>
                  )}
                </AccordionItem>
              )
            )}
          </div>
        </Accordion>

        {/* Quick Links Section */}
        <div className="border-t border-gray-100/50 bg-gray-50/50 px-6 py-4">
          <div className="flex flex-col space-y-3">
            {quickLinks.map((item) =>
              item.value === "sign_in" && user?.id ? (
                <button
                  className="w-fit cursor-pointer text-base text-gray-700 transition-colors hover:text-blue-500"
                  key={item.label}
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              ) : (
                <TransitionLink
                  key={item.label}
                  href={item.href}
                  className="text-base text-gray-700 transition-colors hover:text-blue-500"
                  onClick={() => {
                    setOpen("");
                    onClose();
                  }}
                >
                  {item.label}
                </TransitionLink>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
