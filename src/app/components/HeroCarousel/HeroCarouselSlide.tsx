import { FC } from "react";
import { LinkButton } from "@/components/ui/button";
import {
  HomepageDocumentDataHeroCarouselDataItem,
  Simplify,
} from "../../../../prismicio-types";

import { PrismicNextImage } from "@prismicio/next";

export type HeroCarouselSlideProps =
  Simplify<HomepageDocumentDataHeroCarouselDataItem>;

const HeroCarouselSlide: FC<HeroCarouselSlideProps> = (props) => {
  const {
    heroCarouselDescription: desc,
    heroCarouselLink: link,
    heroCarouselTitle: title,
    heroCarouselBackground: img,
  } = props;
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-end overflow-clip rounded-2xl p-12 max-lg:min-h-[500px] max-lg:p-6 lg:min-h-[635px]">
      {img && (
        <>
          <div className="absolute inset-0 h-full w-full">
            <PrismicNextImage
              alt=""
              field={img}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-bl from-[rgba(32,32,32,0)] via-transparent via-20% to-[#0F0F0F]" />
          </div>
        </>
      )}
      <div className="z-20 flex max-w-[650px] items-end gap-16 self-stretch">
        <div className="flex w-full flex-col items-start gap-4 text-white">
          {title && <h2 className="heading-2 self-stretch">{title}</h2>}
          {desc && <p>{desc}</p>}
          {link && (
            <LinkButton
              variant="tertiary"
              outlined
              className="pt-4"
              field={link}
            >
              {link.text}
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroCarouselSlide;
