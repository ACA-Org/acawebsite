"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import HeroCarouselSlide, { HeroCarouselSlideProps } from "./HeroCarouselSlide";
import { SlideControls } from "@/components/slide-controls";

interface HeroCarouselProps {
  slides: HeroCarouselSlideProps[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1440px] overflow-clip px-4 pb-24 md:overflow-visible md:px-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          pagination={false}
          allowTouchMove={false}
          autoplay={{
            delay: 6000,
            disableOnInteraction: true,
          }}
          className="relative h-full w-full !overflow-visible"
          loopAdditionalSlides={1}
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="flex h-full w-full items-center justify-center"
            >
              {({ isActive }) => (
                <div
                  className={`h-full w-full transition-all duration-800 ${
                    isActive
                      ? "scale-100 opacity-100 grayscale-0"
                      : "scale-95 opacity-40 grayscale"
                  }`}
                >
                  <HeroCarouselSlide {...slide} index={index} />
                </div>
              )}
            </SwiperSlide>
          ))}

          <SlideControls className="z-40 mt-5 !left-1/2 !right-auto !bottom-auto !-translate-x-1/2 [&_button]:!border-[#FFC72C] [&_button]:!bg-[#0F2D52] [&_button]:!text-[#FFC72C] [&_svg]:!text-[#FFC72C]" />
        </Swiper>
      </div>
    </div>
  );
};

export default HeroCarousel;
