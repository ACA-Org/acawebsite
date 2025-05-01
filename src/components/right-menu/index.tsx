"use client";

import { RightMenuData } from "@/app/actions/getRightMenuData";
import { ArrowLeft } from "@/icons/ArrowLeft";

import { useRouter } from "next/navigation";
import RightMenuLinks from "./RightMenuLinks";
import RightMenuAccordion from "./RightMenuAccordion";
import { Accordion } from "./RightMenuAccordion/accordion";

export const RightMenu = ({
  items,
  rightMenuHeader,
}: {
  items: RightMenuData;
  rightMenuHeader?: string;
}) => {
  const router = useRouter();
  if (!items || items.length < 1) return null;

  return (
    <div className="max-w-[380px] md:min-w-[270px] sticky top-24 max-h-[calc(100dvh-6rem)] overflow-scroll">
      {rightMenuHeader && (
        <div className="w-full h-[60px] border-b border-blue-100 pl-5 pb-5 pt-[18px]">
          <p className="font-semibold body-xl text-blue-300">
            {rightMenuHeader}
          </p>
        </div>
      )}
      <div className="divide-y divide-blue-500/10">
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
      </div>
      <div
        role="button"
        onClick={() => router.back()}
        className="flex items-center gap-6 self-stretch p-4 group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-[14px] stroke-blue-200" />
        <span className="body-lg text-blue-200 group-hover:underline">
          Back to Previous Page
        </span>
      </div>
    </div>
  );
};
