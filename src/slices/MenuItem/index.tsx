import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `MenuItem`.
 */
export type MenuItemProps = SliceComponentProps<Content.MenuItemSlice>["slice"];

/**
 * Component for "MenuItem" Slices.
 */

const MenuItem: FC<MenuItemProps> = (props) => {
  return (
    <div
      data-slice-type={props.slice_type}
      data-slice-variation={props.variation}
    />
  );
};

export default MenuItem;
