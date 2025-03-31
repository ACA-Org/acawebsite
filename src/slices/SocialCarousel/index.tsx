"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { SlideControls } from "@/components/slide-controls";
import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { LinkButton } from "@/components/ui/button";
import { X } from "@/icons/X";
import { LinkedIn } from "@/icons/LinkedIn";
import { Instagram } from "@/icons/Instagram";
import { Facebook } from "@/icons/Facebook";

/**
 * Props for `SocialCarousel`.
 */
export type SocialCarouselProps =
  SliceComponentProps<Content.SocialCarouselSlice>;

/**
 * Component for "SocialCarousel" Slices.
 */

const SocialCarousel: FC<SocialCarouselProps> = ({ slice }) => {
  const {
    primary: {
      socialCarouselLink: link,
      socialCarouselDescription: desc,
      socialCarouselTitle: title,
    },
  } = slice;

  return (
    <div className="relative flex flex-col items-start gap-16 pt-12 pb-8 px-8 w-full bg-blue-50 rounded-2xl border border-solid border-[#0f2d5226]">
      <div className="p-0 w-full">
        <div className="flex items-start justify-between w-full">
          <div className="flex-col items-start gap-6 flex-1 grow flex">
            {title && (
              <h2 className="self-stretch mt-[-1.00px] heading-2 text-blue-300">
                {title}
              </h2>
            )}

            {desc && (
              <p className="w-full max-w-[900px] body-md text-gray-300">
                {desc}
              </p>
            )}
          </div>

          <div className="gap-2 flex">
            <Facebook
              role="button"
              className="fill-blue-300 h-7 transition-colors w-auto hover:fill-gold-100 cursor-pointer"
            />
            <Instagram
              role="button"
              className="fill-blue-300 h-7 transition-colors w-auto hover:fill-gold-100 cursor-pointer"
            />
            <LinkedIn
              role="button"
              className="fill-blue-300 h-7 transition-colors w-auto hover:fill-gold-100 cursor-pointer"
            />
            <X
              role="button"
              className="fill-blue-300 h-7 transition-colors w-auto hover:fill-gold-100 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="p-0 w-full">
        <Swiper
          modules={[Pagination, Autoplay]}
          wrapperClass="flex !justify-start"
          style={{
            position: "static",
          }}
          spaceBetween={20}
          slidesPerView="auto"
          className="w-full h-full !overflow-visible flex flex-col"
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((slide, index) => (
            <SwiperSlide
              key={index}
              className="h-full !w-fit flex items-center justify-center !overflow-visible"
            >
              <div
                className={
                  "transition-all duration-300 overflow-visible h-[300px] aspect-square bg-white rounded-xl shadow-2xl"
                }
              >
                <p className="flex h-full items-center justify-center text-9xl text-muted-foreground">
                  {slide}
                </p>
              </div>
            </SwiperSlide>
          ))}
          <SlideControls variant="primary" className="right-8 bottom-8" />
        </Swiper>
      </div>

      <div className="flex items-center justify-between w-full">
        {link && (
          <LinkButton
            variant="primary"
            outlined
            className="text-lg font-medium pt-4"
            field={link}
          >
            {link.text}
          </LinkButton>
        )}
      </div>
    </div>
  );
};
export default SocialCarousel;
