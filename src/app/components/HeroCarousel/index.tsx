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
      <div className="mx-auto w-full max-w-[1440px] overflow-clip px-4 md:overflow-visible md:px-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          pagination={false}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
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
                  className={`h-full w-full transition-all duration-800 ${isActive ? "scale-100 opacity-100 grayscale-0" : "scale-95 opacity-40 grayscale"} `}
                >
                  <HeroCarouselSlide {...slide} />
                </div>
              )}
            </SwiperSlide>
          ))}
          <SlideControls className="right-12 bottom-12 z-40 max-lg:right-6 max-lg:bottom-6" />
        </Swiper>
      </div>
    </div>
  );
};

export default HeroCarousel;
