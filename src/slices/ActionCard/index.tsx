import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ActionCard`.
 */
export type ActionCardProps = SliceComponentProps<Content.ActionCardSlice>;

/**
 * Component for "ActionCard" Slices.
 */
const ActionCard: FC<ActionCardProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for action_card (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ActionCard;
