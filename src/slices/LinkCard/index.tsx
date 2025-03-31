import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicLink, SliceComponentProps } from "@prismicio/react";
import { ArrowRight } from "@/icons/ArrowRight";

/**
 * Props for `LinkCard`.
 */
export type LinkCardProps = SliceComponentProps<Content.LinkCardSlice>;

/**
 * Component for "LinkCard" Slices.
 */
const LinkCard: FC<LinkCardProps> = ({ slice }) => {
  const {
    primary: { cardDescription: description, cardTitle: title, cardLink: link },
  } = slice;
  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative group w-[284px] p-6 h-[260px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out bg-[linear-gradient(180deg,rgba(15,45,82,0)_0%,rgba(15,45,82,0.75)_100%),linear-gradient(0deg,rgba(0,95,150,1)_0%,rgba(0,95,150,1)_100%)]"
    >
      <div className="absolute inset-0 transition-opacity opacity-0 bg-[linear-gradient(180deg,rgba(3,10,18,0)_0%,rgba(3,10,18,0.75)_100%),linear-gradient(0deg,rgba(0,95,150,1)_0%,rgba(0,95,150,1)_100%)] group-hover:opacity-100" />
      <div className="flex flex-col items-start justify-end h-full transition-all duration-500 ease-in-out transform group-hover:-translate-y-[42px]">
        {title && (
          <h2 className="relative self-stretch font-bold text-white text-2xl tracking-[0] leading-10 transition-transform duration-500 ease-in-out">
            {title}
          </h2>
        )}
        {description && (
          <p className="relative self-stretch font-normal text-white text-base tracking-[0] leading-[normal] transition-transform duration-500 ease-in-out">
            {description}
          </p>
        )}
      </div>
      {link?.text && (
        <div className="flex flex-col items-start gap-2.5 opacity-0 transform translate-y-4 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:-translate-y-4">
          <PrismicLink
            field={link}
            className="inline-flex items-center gap-4 relative flex-[0_0_auto]"
          >
            <span className="relative w-fit mt-[-1.00px] font-['Open_Sans',Helvetica] font-normal text-blue-50 text-lg tracking-[0] leading-[18px] whitespace-nowrap">
              {link.text}
            </span>
            <ArrowRight className="relative w-[17.5px] h-[15.5px] mr-[-0.75px] stroke-blue-50" />
          </PrismicLink>
        </div>
      )}
    </div>
  );
};

export default LinkCard;
