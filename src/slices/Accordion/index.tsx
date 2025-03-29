import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {
  Accordion as SAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

/**
 * Props for `Accordion`.
 */
export type AccordionProps = SliceComponentProps<Content.AccordionSlice>;

/**
 * Component for "Accordion" Slices.
 */
const Accordion: FC<AccordionProps> = ({ slice }) => {
  const {
    primary: { accordionItems },
  } = slice;
  return (
    <SAccordion
      type="single"
      collapsible
      className="w-full border-t border-b border-[rgba(207,207,207,1)]"
    >
      {accordionItems.map(({ accordionDescription, accordionTitle }, index) => (
        <AccordionItem
          key={`${accordionTitle}-${index}`}
          value={`${accordionTitle}-${index}`}
        >
          <AccordionTrigger>{accordionTitle}</AccordionTrigger>
          <AccordionContent>{accordionDescription}</AccordionContent>
        </AccordionItem>
      ))}
    </SAccordion>
  );
};

export default Accordion;
