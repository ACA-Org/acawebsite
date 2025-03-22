import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { LinkButton } from "@/components/ui/button";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `SideBySide`.
 */
export type SideBySideProps = SliceComponentProps<Content.SideBySideSlice>;

/**
 * Component for "SideBySide" Slices.
 */
const SpeedBump: FC<SideBySideProps> = ({ slice }) => {
    const {
        primary: {
            speedBumpDescription: description,
            speedBumpImage: hero,
            speedBumpTitle: title,
            speedBumpLink: link,
        },
    } = slice;

    return (
        <div
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="flex rounded-3xl shadow-2xl p-8 pr-16 overflow-hidden bg-[#EBFAFF]"
        >
            <div className="flex h-full items-center gap-8 self-stretch">
                {hero && (
                    <figure className="relative h-full w-auto">
                        <PrismicNextImage
                            className="w-full h-full object-cover rounded-md"
                            field={hero}
                        />
                    </figure>
                )}
                <div className="flex flex-col flex-1 gap-4 items-start h-fit">
                    <div className="flex flex-col gap-1">
                        {title && (
                            <h2 className="heading-3 text-blue-300 font-semibold">
                                {title}
                            </h2>
                        )}
                    </div>
                    {description && (
                        <p className="body-md text-gray-300">{description}</p>
                    )}
                    {link && <LinkButton field={link}>{link.text}</LinkButton>}
                </div>
            </div>
        </div>
    );
};

export default SpeedBump;
