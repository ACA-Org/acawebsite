import { RightMenuItem } from "@/app/actions/getRightMenuData";
import { linkResolver } from "@/lib/linkResolver";
import { labelFormatter } from "@/lib/strting";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";
import { useAtomValue } from "jotai";
import { pageInfoAtom } from "@/app/atoms/pageInfoAtom";

/**
 * Component for "RightMenuLink" Slices.
 */
const RightMenuLink = ({ link }: { link: RightMenuItem }) => {
  const { href, label } = link;
  const pathName = usePathname();
  const pages = useAtomValue(pageInfoAtom);

  return (
    <div className="flex h-15 w-full items-center py-4.5 pl-5">
      <PrismicNextLink
        className="body-md text-body w-60 cursor-pointer leading-4 text-gray-300 hover:text-black hover:underline"
        href={pathName?.charAt(-1) === "/" ? pathName : `${pathName}/` + href}
        linkResolver={(doc) => linkResolver(doc, pages)}
      >
        {labelFormatter(label)}
      </PrismicNextLink>
    </div>
  );
};

export default RightMenuLink;
