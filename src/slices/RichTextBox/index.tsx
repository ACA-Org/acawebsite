import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import PageRichText from "@/app/components/PageRichText";

/**
 * Props for `RichTextBox`.
 */
export type RichTextBoxProps = SliceComponentProps<Content.RichTextBoxSlice>;

/**
 * Component for "RichTextBox" Slices.
 */
const RichTextBox: FC<RichTextBoxProps> = ({ slice }) => {
  const { textContent } = slice.primary;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PageRichText content={textContent} />
    </section>
  );
};

export default RichTextBox;
