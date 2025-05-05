import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicLinkButton } from "@/components/ui/button";

/**
 * Props for `ButtonGroup`.
 */
export type ButtonGroupProps = SliceComponentProps<Content.ButtonGroupSlice>;

/**
 * Component for "ButtonGroup" Slices.
 */
const ButtonGroup: FC<ButtonGroupProps> = ({ slice }) => {
  const {
    primary: { actions },
  } = slice;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-row gap-4 w-full items-center justify-center"
    >
      {actions.slice(0, 2).map((action, index) => (
        <PrismicLinkButton
          className="w-full max-w-64"
          variant={index % 2 === 0 ? "secondary" : "primary"}
          key={action.key}
          field={action}
        >
          {action.text}
        </PrismicLinkButton>
      ))}
    </section>
  );
};

export default ButtonGroup;
