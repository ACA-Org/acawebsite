import Link from "next/link";
import { AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { RightMenuItem } from "@/app/actions/getRightMenuData";
/**
 * Component for "RightMenu" Slices.
 */
const RightMenuAccordion = ({ link }: { link: RightMenuItem }) => {
  const { href, label, children } = link;

  return (
    // <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger className="">{label}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-0">
        <Link
          href={href}
          className="flex items-center pl-10 pt-[14px] pb-[16px] body-sm text-gray-300 hover:text-black"
        >
          Overview
        </Link>
        {children?.map(({ label, href }, index) => (
          <Link
            href={href}
            className="flex items-center pl-10 pt-[14px] pb-[16px] body-sm text-gray-300 hover:text-black"
            key={index}
          >
            {label}
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default RightMenuAccordion;
