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
            speedbumpdescription: description,
            speedbumpimage: hero,
            speedbumptitle: title,
            speedbumplink: link,
        },
    } = slice;

    return (
        <div
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="flex rounded-3xl shadow-2xl p-8 pr-16 overflow-hidden"
        >
            <div className="flex flex-row h-fit items-center gap-8 self-stretch">
                {hero && (
                    <PrismicNextImage
                        className="h-full w-full object-center object-cover rounded-md"
                        field={hero}
                    />
                )}
                <div className="flex flex-col gap-6 items-start text-[#808080] h-fit">
                    <div className="flex flex-col gap-1">
                        {title && (
                            <h2 className="text-4xl font-bold leading-[60px]">
                                {title}
                            </h2>
                        )}
                    </div>
                    {description && <p>{description}</p>}
                    {link && (
                        <LinkButton className="bg-[#808080] pt-4" field={link}>
                            {link.text}
                        </LinkButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpeedBump;
