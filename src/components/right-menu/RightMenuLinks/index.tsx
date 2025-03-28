import { RightMenuItem } from "@/app/actions/getRightMenuData";
import Link from "next/link";
/**
 * Component for "RightMenuLink" Slices.
 */
const RightMenuLink = ({ link }: { link: RightMenuItem }) => {
    const { href, label } = link;
    return (
        <div className="flex w-full h-15 items-center pl-5 py-4.5">
            <Link
                className="w-60 text-gray-300 hover:text-black cursor-pointer body-md leading-4"
                href={href}
            >
                {label}
            </Link>
        </div>
    );
};

export default RightMenuLink;
