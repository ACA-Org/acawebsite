import React, { useState, useEffect, useRef } from "react";
import { MenuItemProps } from "@/slices/MenuItem";
import { PrismicNextLink } from "@prismicio/next";
import { cn } from "@/lib/utils";
import {
  AccordionItem,
  Accordion,
  AccordionTrigger,
  AccordionContent,
} from "@/components/right-menu/RightMenuAccordion/accordion";

interface MobileMenuProps {
  slices: MenuItemProps[];
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
}

export function MobileMenu({
  slices,
  isOpen,
  onClose,
  isCollapsed,
}: MobileMenuProps) {
  const [open, setOpen] = useState<string | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
        <div
          className="fixed inset-0 z-[98] bg-black/50 transition-opacity duration-300"
          style={{
            top: isCollapsed ? "59px" : "76px",
          }}
        />
      )}
      <div
        ref={menuRef}
        className={cn(
          "border-top fixed right-0 left-0 z-[99] border-b-[rgba(0,95,150,0.08)] bg-white shadow-lg transition-all duration-300",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        )}
        style={{
          top: isCollapsed ? "59px" : "76px",
        }}
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
                      <PrismicNextLink
                        field={tierOneLink}
                        className="text-lg font-medium text-blue-300"
                        onClick={() => {
                          setOpen("");
                          onClose();
                        }}
                      >
                        {tierOneLink.text}
                      </PrismicNextLink>
                    ) : (
                      <span className="text-lg font-medium text-blue-300">
                        {tierOneLink.text}
                      </span>
                    )}
                  </AccordionTrigger>

                  {tierTwoMenuItems && (
                    <AccordionContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                      <div className="bg-gray-50/50 px-6 py-2">
                        {tierTwoMenuItems.map((item, i) => (
                          <PrismicNextLink
                            key={i}
                            field={item.tierTwoMenuLink}
                            className="block py-3 text-base text-gray-700"
                            onClick={() => {
                              setOpen("");
                              onClose();
                            }}
                          >
                            {item.tierTwoMenuLink.text}
                          </PrismicNextLink>
                        ))}
                      </div>
                    </AccordionContent>
                  )}
                </AccordionItem>
              )
            )}
          </div>
        </Accordion>
      </div>
    </>
  );
}

