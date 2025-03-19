import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `RightMenuLink`.
 */
export type RightMenuLinkProps =
    SliceComponentProps<Content.RightMenuLinkSlice>;

/**
 * Component for "RightMenuLink" Slices.
 */
const RightMenuLinks = ({ slice }: { slice: RightMenuLinkProps["slice"] }) => {
    const {
        primary: { rightMenuLinks },
    } = slice;
    return (
        <div
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="flex flex-col divide-y divide-[#E5E5E5]"
        >
            {rightMenuLinks?.map((link, index) => (
                <div
                    key={`${link.text}-${index}`}
                    className="flex w-full h-15 items-center pl-5 pt-[18px] pb-[22px]"
                >
                    <PrismicNextLink
                        className="w-60 text-gray-300 hover:text-black cursor-pointer font-normal text-sm leading-[140%]"
                        field={link}
                    >
                        {link.text}
                    </PrismicNextLink>
                </div>
            ))}
        </div>
    );
};

export default RightMenuLinks;
