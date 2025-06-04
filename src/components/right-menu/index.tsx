"use client";

import { RightMenuData } from "@/app/actions/getRightMenuData";
import { ArrowLeft } from "@/icons/ArrowLeft";
import { useRouter } from "next/navigation";
import RightMenuLinks from "./RightMenuLinks";
import RightMenuAccordion from "./RightMenuAccordion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./RightMenuAccordion/accordion";

export const RightMenu = ({
  items,
  rightMenuHeader,
}: {
  items: RightMenuData;
  rightMenuHeader?: string;
}) => {
  const router = useRouter();

  if (!items || items.length < 1) return null;

  // Menu content as a component for reuse
  const menuContent = (
    <Accordion
      type="single"
      collapsible
      className="w-full divide-y divide-blue-500/12 border-b border-blue-500/12"
    >
      {items
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((menuItem, index) => {
          if (!menuItem?.children || menuItem?.children.length < 1) {
            return (
              <RightMenuLinks
                key={`${menuItem.href}-${index}`}
                link={menuItem}
              />
            );
          } else {
            return (
              <RightMenuAccordion
                key={`${menuItem.href}-${index}`}
                link={menuItem}
              />
            );
          }
        })}
    </Accordion>
  );

  return (
    <div className="sticky top-24 max-h-[calc(100dvh-6rem)] overflow-scroll">
      <div className="hidden md:block">
        {rightMenuHeader && (
          <div className="h-[60px] w-full border-b border-blue-100 pt-[18px] pb-5 pl-5">
            <p className="body-xl font-semibold text-blue-300">
              {rightMenuHeader}
            </p>
          </div>
        )}
        <div className="divide-y divide-blue-500/10">{menuContent}</div>
      </div>
      <div className="block md:hidden">
        <Accordion
          type="single"
          collapsible
          className="w-full border-b border-blue-500/12"
        >
          <AccordionItem value="section">
            <AccordionTrigger className="h-[60px] w-full pt-[18px] pb-5 pl-5">
              <p className="body-xl font-semibold text-blue-300">
                {rightMenuHeader || "In this section"}
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="divide-y divide-blue-500/10">{menuContent}</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div
        role="button"
        onClick={() => router.back()}
        className="group hidden cursor-pointer items-center gap-6 self-stretch p-4 sm:flex"
      >
        <ArrowLeft className="h-[14px] w-4 stroke-blue-200" />
        <span className="body-lg text-blue-200 group-hover:underline">
          Back to Previous Page
        </span>
      </div>
    </div>
  );
};
