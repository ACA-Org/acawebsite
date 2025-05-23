import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
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
    primary: { accordionItems, accordionHeading, accordionContent },
  } = slice;
  return (
    <section className="w-full">
      {(accordionHeading || accordionContent) && (
        <div className="mb-6">
          {accordionHeading && (
            <h2 className="heading-2 mb-6 text-blue-200">{accordionHeading}</h2>
          )}
          {accordionContent && (
            <div className="mb-6 w-full max-w-[900px]">{accordionContent}</div>
          )}
        </div>
      )}
      <SAccordion
        type="single"
        collapsible
        className="w-full border-t border-b border-[rgba(207,207,207,1)]"
      >
        {accordionItems.map(
          ({ accordionDescription, accordionTitle }, index) => (
            <AccordionItem
              key={`${accordionTitle}-${index}`}
              value={`${accordionTitle}-${index}`}
            >
              <AccordionTrigger>{accordionTitle}</AccordionTrigger>
              <AccordionContent>
                <PrismicRichText field={accordionDescription} />
              </AccordionContent>
            </AccordionItem>
          )
        )}
      </SAccordion>
    </section>
  );
};

export default Accordion;
