"use client";

import React, { FC, useState, useEffect, useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
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

  const swiperRef = useRef<SwiperRef>(null);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      if (swiperRef.current) {
        const containerWidth = window.innerWidth;
        const contentWidth = swiperRef.current.swiper.el.scrollWidth;
        setShowControls(contentWidth > containerWidth);
      }
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-start gap-12 overflow-visible px-4 py-12 md:px-8 xl:px-0">
      {(title || subTitle) && (
        <div className="flex flex-1 flex-col items-start gap-6">
          {tag && <p className="body-tag text-gray-500 uppercase">{tag}</p>}
          {title && <h2 className="heading-2 text-blue-300">{title}</h2>}
          {subTitle && <p className="body-sm text-white">{subTitle}</p>}
        </div>
      )}
      {slides?.length && slides.length > 3 ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          wrapperClass="flex !justify-start"
          spaceBetween={20}
          slidesPerView="auto"
          className="flex h-full w-full flex-col !overflow-visible"
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          ref={swiperRef}
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

          {showControls && <SlideControls className="right-0 -bottom-28" />}
        </Swiper>
      ) : (
        <div className="flex gap-6 max-md:flex-col">
          {slides.map((slide, index) => (
            <LinkTile
              variation="default"
              version=""
              items={[]}
              slice_type="link_tile"
              slice_label={null}
              id="string"
              key={index}
              primary={{
                tileDescription: slide.carouselSlideDescription,
                tileImage: slide.carouselSlideBackground,
                tileTitle: slide.carouselSlideTitle,
                tileLink: slide.carouselSlideLink,
              }}
            />
          ))}
        </div>
      )}


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
