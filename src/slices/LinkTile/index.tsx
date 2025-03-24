import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `LinkTile`.
 */
export type LinkTileProps = SliceComponentProps<Content.LinkTileSlice>;

/**
 * Component for "LinkTile" Slices.
 */
const LinkTile: FC<LinkTileProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for link_tile (variation: {slice.variation}) Slices
    </section>
  );
};

export default LinkTile;
