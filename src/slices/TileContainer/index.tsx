import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { LinkButton } from "@/components/ui/button";
import { PrismicNextImage } from "@prismicio/next";
import React from "react";

/**
 * Props for `TileContainer`.
 */
export type TileContainerProps =
  SliceComponentProps<Content.TileContainerSlice>;

/**
 * Component for "TileContainer" Slices.
 */
const TileContainer: FC<TileContainerProps> = ({ slice }) => {
  const {
    primary: { tiles, tileSectionTitle, tileSectionDesc },
  } = slice;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full"
    >
      {(tileSectionTitle || tileSectionDesc) && (
        <div>
          {tileSectionTitle && (
            <h2 className="heading-2 mb-6 text-blue-200">{tileSectionTitle}</h2>
          )}

          {tileSectionDesc && (
            <div>
              <PrismicRichText field={tileSectionDesc} />
            </div>
          )}
        </div>
      )}
      {tiles.length > 0 && (
        <div className="flex flex-wrap gap-6">
          {tiles.map((tile, i) => (
            <React.Fragment key={i}>
              {tile.tileLink.text ? (
                <div
                  key={i}
                  className="relative flex min-h-[250px] max-w-1/3 flex-1 items-end overflow-clip rounded-md bg-none p-6"
                >
                  <div className="absolute bottom-0 left-0 z-1 h-full w-full bg-gradient-to-t from-[#0F2D52] to-transparent" />
                  <figure className="absolute top-0 left-0 -z-1 h-full w-full">
                    <PrismicNextImage
                      field={tile.tileImage}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </figure>
                  <div className="relative z-2 flex flex-col gap-2 text-white">
                    <span className="heading-4">{tile.tileHeading}</span>
                    <span>{tile.tileDesc}</span>
                    {tile.tileLink?.text && (
                      <LinkButton field={tile.tileLink}>
                        {tile.tileLink.text}
                      </LinkButton>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative flex min-h-[250px] max-w-1/3 flex-1 items-end overflow-clip rounded-md p-6">
                  <div className="absolute bottom-0 left-0 z-1 h-full w-full bg-gradient-to-t from-[#0F2D52] to-transparent" />
                  <figure className="absolute top-0 left-0 -z-1 h-full w-full">
                    <PrismicNextImage
                      field={tile.tileImage}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </figure>
                  <div className="relative z-2 flex flex-col gap-2 text-white">
                    <span className="heading-4">{tile.tileHeading}</span>
                    <span>{tile.tileDesc}</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </section>
  );
};

export default TileContainer;
