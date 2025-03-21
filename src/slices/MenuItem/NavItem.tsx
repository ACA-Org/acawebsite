import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

export const NavItem = ({ link }: { link: LinkField }) => {
    return (
        <PrismicNextLink
            field={link}
            className="text-blue-300 text-sm group-hover:underline group-hover:text-blue-200 hover:bg-transparent"
        >
            {link.text}
        </PrismicNextLink>
    );
};
