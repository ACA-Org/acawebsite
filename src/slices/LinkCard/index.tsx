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
      className="group relative h-[260px] w-[284px] overflow-hidden rounded-2xl bg-[linear-gradient(180deg,rgba(15,45,82,0)_0%,rgba(15,45,82,0.75)_100%),linear-gradient(0deg,rgba(0,95,150,1)_0%,rgba(0,95,150,1)_100%)] p-6 shadow-lg transition-all duration-500 ease-in-out"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,18,0)_0%,rgba(3,10,18,0.75)_100%),linear-gradient(0deg,rgba(0,95,150,1)_0%,rgba(0,95,150,1)_100%)] opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex h-full transform flex-col items-start justify-end transition-all duration-500 ease-in-out group-hover:-translate-y-[42px]">
        {title && (
          <h2 className="relative self-stretch text-2xl leading-10 font-bold tracking-[0] text-white transition-transform duration-500 ease-in-out">
            {title}
          </h2>
        )}
        {description && (
          <p className="relative self-stretch text-base leading-[normal] font-normal tracking-[0] text-white transition-transform duration-500 ease-in-out">
            {description}
          </p>
        )}
      </div>
      {link?.text && (
        <div className="flex translate-y-4 transform flex-col items-start gap-2.5 opacity-0 transition-all duration-500 ease-in-out group-hover:-translate-y-4 group-hover:opacity-100">
          <PrismicLink
            field={link}
            className="relative inline-flex flex-[0_0_auto] items-center gap-4"
          >
            <span className="relative mt-[-1.00px] w-fit font-['Open_Sans',Helvetica] text-lg leading-[18px] font-normal tracking-[0] whitespace-nowrap text-blue-50">
              {link.text}
            </span>
            <ArrowRight className="relative mr-[-0.75px] h-[15.5px] w-[17.5px] stroke-blue-50" />
          </PrismicLink>
        </div>
      )}
    </div>
  );
};

export default LinkCard;
