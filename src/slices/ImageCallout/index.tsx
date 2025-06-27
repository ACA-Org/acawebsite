import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { DynamicImage } from "@/components/image";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Props for `ImageCallout`.
 */
export type ImageCalloutProps = SliceComponentProps<Content.ImageCalloutSlice>;

/**
 * Component for "ImageCallout" Slices.
 */
const ImageCallout: FC<ImageCalloutProps> = ({ slice }) => {
  const {
    primary: {
      imageCalloutImage,
      imageCalloutTitle,
      imageCalloutDesc,
      imageCalloutLink,
      imageAnchor,
      imageFit,
    },
  } = slice;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full pt-6 sm:mb-10"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div
          className={cn(
            "flex w-full items-center gap-6 max-md:flex-col md:gap-12",
            {
              "flex-row-reverse": slice.variation === "textLeft",
            }
          )}
        >
          <figure
            className={cn("relative overflow-clip rounded-lg max-md:w-full", {
              "flex-1": imageFit !== "contain",
              "min-h-[305px]": imageFit !== "contain", // Only apply min-height when not contain
              "w-full": imageFit === "contain",
              "flex-shrink-0": imageFit === "contain",
              "max-w-[600px]": imageFit === "contain",
              "max-h-[250px]": imageFit === "contain", // Limit height when contain to prevent exceeding text
            })}
          >
            <DynamicImage
              alt=""
              field={imageCalloutImage}
              className={cn(
                imageFit === "contain"
                  ? "h-full w-full"
                  : "absolute h-full w-full",
                {
                  "object-cover": !imageFit || imageFit === "cover",
                  "object-contain": imageFit === "contain",
                  "object-center": !imageAnchor || imageAnchor === "center",
                  "object-left": imageAnchor === "left",
                  "object-right": imageAnchor === "right",
                  "object-top": imageAnchor === "top",
                  "object-bottom": imageAnchor === "bottom",
                }
              )}
            />
          </figure>

          <div className="flex flex-1 flex-col gap-4 py-6 max-md:py-0">
            {imageCalloutTitle && (
              <h3 className="heading-3">{imageCalloutTitle}</h3>
            )}
            {imageCalloutDesc && (
              <div className="body-md text-gray-600">{imageCalloutDesc}</div>
            )}
            {imageCalloutLink.text && (
              <div className="max-md:w-full">
                <LinkButton field={imageCalloutLink} className="max-md:w-full">
                  {imageCalloutLink.text}
                </LinkButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCallout;

