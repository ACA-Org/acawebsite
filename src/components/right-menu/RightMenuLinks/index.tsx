import { RightMenuItem } from "@/app/actions/getRightMenuData";
import { labelFormatter } from "@/lib/strting";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";

/**
 * Component for "RightMenuLink" Slices.
 */
const RightMenuLink = ({ link }: { link: RightMenuItem }) => {
  const { href, label } = link;
  const pathName = usePathname();

  return (
    <div className="flex w-full h-15 items-center pl-5 py-4.5">
      <PrismicNextLink
        className="w-60 text-gray-300 hover:text-black hover:underline cursor-pointer body-md leading-4"
        href={pathName?.charAt(-1) === "/" ? pathName : `${pathName}/` + href}
      >
        {labelFormatter(label)}
      </PrismicNextLink>
    </div>
  );
};

export default RightMenuLink;
