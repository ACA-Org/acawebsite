import { Simplify } from "@/lib/utils";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

type NavMenuLinkProps =
    Simplify<Content.MenuItemSliceDefaultPrimaryTierTwoMenuItemsItem>;

export const NavMenuLink = (props: NavMenuLinkProps) => {
    const {
        tierTwoMenuLink: link,
        tierTwoMenuDesc: desc,
        // tierTwoMenuIcon: img,
    } = props;
    return (
        <PrismicNextLink field={link} className="w-max col-span-1 group">
            <span className="flex h-9 items-center gap-3 pr-3 w-max">
                <span className="w-9 h-9 bg-gray-100 group-hover:bg-blue-300 transition-colors rounded-sm" />

                <div className="flex flex-col justify-center items-start gap-1 text-gray-300 w-max">
                    <p className="group-hover:text-blue-200 transition-colors">
                        {link.text}
                    </p>
                    <p className="text-xs">{desc}</p>
                </div>
            </span>
        </PrismicNextLink>
    );
};
