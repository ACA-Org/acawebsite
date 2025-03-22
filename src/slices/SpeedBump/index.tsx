import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { LinkButton } from "@/components/ui/button";
import { PrismicNextImage } from "@prismicio/next";
import { cn } from "@/lib/utils";

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
            speedBumpTheme: theme = "light",
        },
    } = slice;

    return (
        <div
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className={cn(
                "flex rounded-3xl shadow-2xl p-8 pr-16 overflow-hidden",
                theme === "light" ? "bg-blue-50" : "bg-blue-300"
            )}
        >
            <div className="flex h-full items-center gap-8 self-stretch">
                {hero && (
                    <figure className="relative h-full w-auto">
                        <PrismicNextImage
                            className="w-full h-full max-h-[210px] object-cover rounded-md"
                            field={hero}
                        />
                    </figure>
                )}
                <div className="flex flex-col flex-1 gap-4 items-start h-fit">
                    <div className="flex flex-col gap-1">
                        {title && (
                            <h2
                                className={cn(
                                    "heading-3 font-semibold",
                                    theme === "light"
                                        ? "text-blue-300"
                                        : "text-white"
                                )}
                            >
                                {title}
                            </h2>
                        )}
                    </div>
                    {description && (
                        <p
                            className={cn(
                                "body-md",
                                theme === "light"
                                    ? "text-gray-300"
                                    : "text-white"
                            )}
                        >
                            {description}
                        </p>
                    )}
                    {link && (
                        <LinkButton
                            outlined={theme !== "light"}
                            variant={theme === "light" ? "primary" : "white"}
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

export default SpeedBump;
