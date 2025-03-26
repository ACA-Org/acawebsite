import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { LinkButton } from "@/components/ui/button";

/**
 * Props for `ConferenceCard`.
 */
export type ConferenceCardProps =
    SliceComponentProps<Content.ConferenceCardSlice>["slice"];

/**
 * Component for "ConferenceCard" Slices.
 */
const ConferenceCard: FC<ConferenceCardProps> = (slice) => {
    const {
        primary: {
            conferenceCardImage: image,
            conferenceCardTitle: title,
            conferenceCardDesc: desc,
            conferenceCardLink: link,
        },
    } = slice;
    return (
        <div
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="group relative flex w-[340px] h-[350px] flex-col justify-end items-center gap-2 p-6 rounded-lg overflow-clip"
        >
            {image && (
                <>
                    <div className="absolute inset-0 w-full h-full">
                        <PrismicNextImage
                            field={image}
                            className="w-full h-full object-cover transition-opacity duration-250 ease-in-out group-hover:opacity-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(32,32,32,0)] via-20% via-transparent to-[#0F0F0F] transition-opacity duration-300 ease-in-out group-hover:via-[rgba(15,15,15,0.6)] group-hover:to-[rgba(15,15,15,0.9)]" />
                    </div>
                </>
            )}
            <div className="flex items-end gap-16 self-stretch z-20 translate-y-[84px] transform transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                <div className="text-white flex w-full flex-col items-start gap-4">
                    {title && (
                        <h2 className="self-stretch heading-3 font-semibold">
                            {title}
                        </h2>
                    )}
                    {desc && <p className="body-sm">{desc}</p>}
                    {link && (
                        <LinkButton
                            variant="tertiary"
                            outlined
                            className="w-full mt-4"
                            field={link}
                        >
                            {link.text}
                        </LinkButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConferenceCard;
