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
            className={cn(
              "relative aspect-video shrink overflow-clip rounded-lg max-md:w-full md:h-[300px] md:max-w-1/2"
            )}
          >
            <DynamicImage
              alt=""
              field={imageCalloutImage}
              className={cn("aspect-video h-full w-full object-cover")}
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

