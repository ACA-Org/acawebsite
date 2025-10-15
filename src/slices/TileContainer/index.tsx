"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React from "react";
import RichText from "@/app/components/RichText";
import { DynamicImage } from "@/components/image";
import { TransitionLink } from "@/components/ui/button";

/**
 * Props for `TileContainer`.
 */
export type TileContainerProps =
  SliceComponentProps<Content.TileContainerSlice>;

/**
 * Component for "TileContainer" Slices.
 */
const TileContainer: FC<TileContainerProps> = ({ slice }) => {
  if (!slice.primary) return null;

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
              <RichText content={tileSectionDesc} />
            </div>
          )}
        </div>
      )}
      {tiles.length > 0 && (
        <div className="flex flex-col flex-wrap gap-6 sm:flex-row">
          {tiles.map(({ tileDesc, tileHeading, tileImage, tileLink }, i) => {
            const Comp = tileLink?.link_type !== "Any" ? TransitionLink : "div";
            return (
              <React.Fragment key={i}>
                <Comp
                  key={i}
                  className="relative flex min-h-[250px] flex-1 items-end overflow-clip rounded-md bg-none p-6 sm:max-w-1/3"
                  field={tileLink}
                >
                  <div className="absolute bottom-0 left-0 z-1 h-full w-full bg-gradient-to-t from-[#0F2D52] to-transparent" />
                  <figure className="absolute top-0 left-0 -z-1 h-full w-full">
                    <DynamicImage
                      field={tileImage}
                      className="h-full w-full object-cover"
                    />
                  </figure>
                  <div className="relative z-2 flex flex-col gap-2 text-white">
                    <span className="heading-4">{tileHeading}</span>
                    <span>{tileDesc}</span>
                    {tileLink?.text && <span>{tileLink?.text}</span>}
                  </div>
                </Comp>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TileContainer;
