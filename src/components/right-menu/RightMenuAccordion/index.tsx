import Link from "next/link";
import { AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { RightMenuItem } from "@/app/actions/getRightMenuData";
import { usePathname } from "next/navigation";
/**
 * Component for "RightMenu" Slices.
 */
const RightMenuAccordion = ({ link }: { link: RightMenuItem }) => {
  const { href, label, children } = link;
  const pathName = usePathname();

  return (
    // <Accordion type="single" collapsible className="w-full">
    <AccordionItem value={label}>
      <AccordionTrigger className="">{label}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-0">
        <Link
          href={pathName?.charAt(-1) === "/" ? pathName : `${pathName}/` + href}
          className="flex items-center pl-10 pt-[14px] pb-[16px] body-sm text-gray-300 hover:text-black"
        >
          Overview
        </Link>
        {children?.map(({ label, href }, index) => (
          <Link
            href={
              pathName?.charAt(-1) === "/" ? pathName : `${pathName}/` + href
            }
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
