import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { LinkButton } from "@/components/ui/button";
import { PrismicNextImage } from "@prismicio/next";
import { cn } from "@/lib/utils";

/**
 * Props for `SpeedBump`.
 */
export type SpeedBumpProps = SliceComponentProps<Content.SpeedBumpSlice>;

/**
 * Component for "SpeedBump" Slices.
 */
const SpeedBump: FC<SpeedBumpProps> = ({ slice }) => {
    const {
        primary: {
            speedBumpDescription: description,
            speedBumpImage: hero,
            speedBumpTitle: title,
            speedBumpLinks: links,
            speedBumpTheme: theme = "light",
            speedBumpLinkPosition: position = "bottom",
        },
    } = slice;

    return (
        <div
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className={cn(
                "flex rounded-3xl p-8 pr-16 overflow-hidden",
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
                <div
                    className={cn(
                        "flex flex-1 gap-4 h-fit",
                        position === "bottom"
                            ? "flex-col items-start"
                            : "flex-row items-center"
                    )}
                >
                    <div className="flex flex-col gap-4">
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
                    </div>
                    {links?.length > 0 && (
                        <div className="flex gap-4 items-center justify-center">
                            {links.map((link, index) => (
                                <LinkButton
                                    key={link.key}
                                    outlined={
                                        theme !== "light" || index % 2 === 1
                                    }
                                    variant={
                                        theme === "light" ? "primary" : "white"
                                    }
                                    field={link}
                                    className=""
                                >
                                    {link.text}
                                </LinkButton>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpeedBump;
