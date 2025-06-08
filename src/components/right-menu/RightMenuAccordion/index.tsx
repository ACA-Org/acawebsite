import { AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { RightMenuItem } from "@/app/actions/getRightMenuData";
import { usePathname } from "next/navigation";
import { labelFormatter } from "@/lib/strting";
import { TransitionLink } from "@/components/ui/button";

const RightMenuAccordion = ({ link }: { link: RightMenuItem }) => {
  const { href, label, children } = link;
  const pathName = usePathname();

  return (
    <AccordionItem value={label}>
      <AccordionTrigger>{label}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-0 divide-y divide-blue-500/12">
        <TransitionLink
          href={pathName?.charAt(-1) === "/" ? pathName : `${pathName}/` + href}
          className="body-sm flex items-center border-t border-blue-500/12 bg-blue-50 pt-[14px] pb-[16px] pl-10 text-gray-300 hover:text-black hover:underline"
        >
          Overview
        </TransitionLink>
        {children?.map(({ label, href }, index) => (
          <TransitionLink
            href={
              pathName?.charAt(-1) === "/" ? pathName : `${pathName}/` + href
            }
            className="body-sm flex items-center bg-blue-50 pt-[14px] pb-[16px] pl-10 text-gray-300 hover:text-black hover:underline"
            key={index}
          >
            {labelFormatter(label)}
          </TransitionLink>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default RightMenuAccordion;
