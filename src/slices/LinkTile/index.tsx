import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicLink } from "@prismicio/react";
import { DynamicImage } from "@/components/image";
import { ArrowRight } from "lucide-react";

/**
 * Props for `LinkTile`.
 */
export type LinkTileProps = SliceComponentProps<Content.LinkTileSlice>["slice"];

/**
 * Component for "LinkTile" Slices.
 */
const LinkTile: FC<LinkTileProps> = (slice) => {
  if (!slice.primary) return null;

  const {
    primary: {
      tileImage: image,
      tileTitle: title,
      tileDescription: desc,
      tileLink: link,
    },
  } = slice;

  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="group relative flex h-[420px] w-full min-w-0 flex-col overflow-hidden rounded-xl bg-white"
    >
      {/* Image / content area */}
      <div className="relative flex min-h-0 flex-1 flex-col justify-end overflow-hidden">
        {image && (
          <>
            <div className="absolute inset-0">
              <DynamicImage
                field={image}
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/85" />
          </>
        )}

        {/* Text overlay */}
        <div className="relative z-20 flex w-full min-w-0 flex-col gap-2 p-5 text-white md:p-6">
          {title && (
            <h2 className="heading-3 w-full min-w-0 break-words font-semibold">
              {title}
            </h2>
          )}

          {desc && (
            <p className="body-sm w-full min-w-0 break-words">
              {desc}
            </p>
          )}
        </div>
      </div>

      {/* Clickable footer */}
      {link && (
        <PrismicLink
          field={link}
          className="relative z-30 flex w-full items-center justify-between gap-4 bg-blue-300 px-5 py-4 text-white no-underline transition-colors hover:bg-gold-100 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-100 md:px-6"
        >
          <span className="font-semibold">
            {link.text || "Learn More"}
          </span>

          <ArrowRight
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
          />
        </PrismicLink>
      )}
    </div>
  );
};

export default LinkTile;
