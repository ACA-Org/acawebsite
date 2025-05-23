import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { LinkButton } from "@/components/ui/button";

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
      className="flex w-full flex-row items-center justify-center gap-4"
    >
      {actions.slice(0, 2).map((action, index) => (
        <LinkButton
          className="w-fit"
          variant={index % 2 === 0 ? "secondary" : "primary"}
          key={action.key}
          field={action}
        >
          {action.text}
        </LinkButton>
      ))}
    </section>
  );
};

export default ButtonGroup;
