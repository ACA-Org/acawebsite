import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { LinkButton } from "@/components/ui/button";
import { DynamicImage } from "@/components/image";
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
    <div className="speedbump mx-auto w-full max-w-[1440px] px-4 sm:mb-10 md:px-8">
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
              <DynamicImage
                className="h-full max-h-[210px] w-full rounded-md object-cover"
                field={hero}
              />
            </figure>
          )}

          <div
            className={cn(
              "flex h-fit min-w-0 w-full flex-1 gap-4",
              variation === "vertical" && "flex-col",
              position === "bottom"
                ? "flex-col items-start"
                : "flex-col items-center sm:flex-row"
            )}
          >
            <div className="flex min-w-0 w-full flex-1 flex-col gap-4">
              <div className="flex min-w-0 w-full flex-col gap-1">
                {title && (
                  <h2
                    className={cn(
                      "heading-3 w-full min-w-0 break-words font-semibold",
                      variation === "vertical" && "text-center",
                      theme === "light" ? "text-blue-300" : "text-gray-600"
                    )}
                  >
                    {title}
                  </h2>
                )}
              </div>

              {description && (
                <p
                  className={cn(
                    "body-md w-full min-w-0 break-words",
                    variation === "vertical" && "text-center",
                    theme === "light" ? "text-gray-300" : "text-gray-600"
                  )}
                >
                  {description}
                </p>
              )}
            </div>

            {links?.length > 0 && (
              <div
                className={cn(
                  "flex w-full flex-wrap items-center justify-center gap-4 max-md:flex-col",
                  variation === "vertical" && "w-full flex-col"
                )}
              >
                {links.map((link, index) => (
                  <LinkButton
                    key={`${link.key}+${index}`}
                    field={link}
                    className={cn(
                      "max-md:w-full",
                      variation === "vertical" && "w-full"
                    )}
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
