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
    primary: { tiles, tileSectionTitle, tileSectionDesc }
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
        <div className="flex gap-6 flex-wrap">
          {tiles.map((tile, i) => (
            <React.Fragment key={i}>
              {tile.tileLink.text ? (
                <div key={i} className="bg-none flex-1 flex items-end p-6 relative min-h-[250px] max-w-1/3 rounded-md overflow-clip">
                  <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#0F2D52] to-transparent z-1" />
                  <figure className="absolute top-0 left-0 -z-1 w-full h-full">
                    <PrismicNextImage
                      field={tile.tileImage}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </figure>
                  <div className="flex flex-col gap-2 text-white relative z-2">
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
                <div className="flex-1 flex items-end p-6 relative min-h-[250px] max-w-1/3 rounded-md overflow-clip">
                  <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#0F2D52] to-transparent z-1" />
                  <figure className="absolute top-0 left-0 -z-1 w-full h-full">
                    <PrismicNextImage
                      field={tile.tileImage}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </figure>
                  <div className="flex flex-col gap-2 text-white relative z-2">
                    <span className="heading-4">{tile.tileHeading}</span>
                    <span>{tile.tileDesc}</span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )
      }
    </section >
  );
};

export default TileContainer;
