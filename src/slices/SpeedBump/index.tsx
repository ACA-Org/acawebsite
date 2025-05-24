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
    variation,
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
    <div className="mx-auto mb-12 w-full max-w-[1440px]">
      <div
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={cn(
          "flex overflow-hidden rounded-xl p-8 max-lg:rounded-lg max-lg:p-4",
          variation === "vertical" && "w-fit p-6 pt-8",
          theme === "light"
            ? "border-blue-300/10% border bg-white"
            : "bg-blue-50"
        )}
      >
        <div className="flex h-full w-full items-center gap-8 self-stretch max-md:flex-col max-md:items-start">
          {hero.url && (
            <figure className="relative h-full w-auto max-md:w-full">
              <PrismicNextImage
                alt=""
                className="h-full max-h-[210px] w-full rounded-md object-cover"
                field={hero}
              />
            </figure>
          )}
          <div
            className={cn(
              "flex h-fit flex-1 gap-4",
              variation === "vertical" && "flex-col",
              position === "bottom"
                ? "flex-col items-start"
                : "flex-row items-center"
            )}
          >
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col gap-1">
                {title && (
                  <h2
                    className={cn(
                      "heading-3 font-semibold",
                      variation === "vertical" && "text-center",
                      theme === "light" ? "text-blue-300" : "text-white"
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
                    variation === "vertical" && "text-center",
                    theme === "light" ? "text-gray-300" : "text-white"
                  )}
                >
                  {description}
                </p>
              )}
            </div>
            {links?.length > 0 && (
              <div
                className={cn(
                  "flex items-center justify-center gap-4",
                  variation === "vertical" && "w-full flex-col"
                )}
              >
                {links.map((link, index) => (
                  <LinkButton
                    key={link.key}
                    outlined={theme !== "light" || index % 2 === 1}
                    variant={theme === "light" ? "primary" : "white"}
                    field={link}
                    className={cn(variation === "vertical" && "w-full")}
                  >
                    {link.text}
                  </LinkButton>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedBump;
