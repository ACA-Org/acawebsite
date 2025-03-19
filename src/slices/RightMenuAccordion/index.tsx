import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./accordion";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `RightMenu`.
 */
export type RightMenuProps = SliceComponentProps<Content.RightMenuSlice>;

/**
 * Component for "RightMenu" Slices.
 */
const RightMenuAccordion = ({ slice }: { slice: RightMenuProps["slice"] }) => {
    const {
        primary: { accordionItems },
    } = slice;
    return (
        <Accordion type="single" collapsible className="w-full">
            {accordionItems?.map(
                ({ accordionLabel, accordionLinks }, index) => (
                    <AccordionItem
                        key={`${accordionLabel}-${index}`}
                        value={`${accordionLabel}-${index}`}
                    >
                        <AccordionTrigger>{accordionLabel}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-0">
                            {accordionLinks.map((accordionLink, index) => (
                                <PrismicNextLink
                                    className="flex items-center pl-10 pt-[14px] pb-[16px] text-sm leading-[140%] text-[color:var(--Text-Light,#636363)] hover:text-[color:var(--Text-Dark,#131313)]"
                                    key={index}
                                    field={accordionLink}
                                >
                                    {accordionLink.text}
                                </PrismicNextLink>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                )
            )}
        </Accordion>
    );
};

export default RightMenuAccordion;
