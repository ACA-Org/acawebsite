"use client";

import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { LinkButton } from "@/components/ui/button";
import { SlideControls } from "@/components/slide-controls";
import LinkTile from "../LinkTile";

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel: FC<CarouselProps> = ({ slice }) => {
  const {
    primary: {
      carouselLink: link,
      carouselSlides: slides,
      carouselSubTitle: subTitle,
      carouselTitle: title,
      carouselTag: tag,
    },
  } = slice;
  return (
    <div className="flex h-full w-full flex-col items-start gap-12 overflow-visible px-19 py-24 [background:linear-gradient(90deg,#0C2545_0%,#081B31_100%)]">
      {(title || subTitle) && (
        <div className="flex flex-1 flex-col items-start gap-6">
          {tag && <p className="body-tag text-blue-50 uppercase">{tag}</p>}
          {title && <h2 className="heading-2 text-gold-100">{title}</h2>}
          {subTitle && <p className="body-sm text-white">{subTitle}</p>}
        </div>
      )}
      <Swiper
        modules={[Pagination, Autoplay]}
        wrapperClass="flex !justify-start"
        spaceBetween={20}
        slidesPerView="auto"
        className="flex h-full w-full flex-col !overflow-visible"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="flex h-full !w-fit items-center justify-center !overflow-visible"
          >
            <div
              className={"h-full overflow-visible transition-all duration-300"}
            >
              <LinkTile
                variation="default"
                version=""
                items={[]}
                slice_type="link_tile"
                slice_label={null}
                id="string"
                primary={{
                  tileDescription: slide.carouselSlideDescription,
                  tileImage: slide.carouselSlideBackground,
                  tileTitle: slide.carouselSlideTitle,
                  tileLink: slide.carouselSlideLink,
                }}
              />
            </div>
          </SwiperSlide>
        ))}
        <SlideControls className="right-0 -bottom-28" />
      </Swiper>

      {link && (
        <LinkButton
          variant="secondary"
          outlined
          className="pt-4 text-lg font-medium text-white"
          field={link}
        >
          {link.text}
        </LinkButton>
      )}
    </div>
  );
};

export default Carousel;
