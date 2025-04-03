import Link from "next/link";
import { AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { RightMenuItem } from "@/app/actions/getRightMenuData";
import { usePathname } from "next/navigation";

const RightMenuAccordion = ({ link }: { link: RightMenuItem }) => {
  const { href, label, children } = link;
  const pathName = usePathname();

  return (
    <AccordionItem value={label}>
      <AccordionTrigger>{label}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-0 divide-y divide-blue-500/12">
        <Link
          href={pathName?.charAt(-1) === "/" ? pathName : `${pathName}/` + href}
          className="flex items-center pl-10 pt-[14px] pb-[16px] body-sm text-gray-300 hover:text-black hover:underline bg-blue-50 border-t border-blue-500/12"
        >
          Overview
        </Link>
        {children?.map(({ label, href }, index) => (
          <Link
            href={
              pathName?.charAt(-1) === "/" ? pathName : `${pathName}/` + href
            }
            className="flex items-center pl-10 pt-[14px] pb-[16px] body-sm text-gray-300 hover:text-black hover:underline bg-blue-50"
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
