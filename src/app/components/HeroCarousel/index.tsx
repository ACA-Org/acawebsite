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
        <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={1}
            slidesPerView={1.1}
            centeredSlides={true}
            loop={true}
            pagination={false}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            className="w-full h-full relative"
            style={{
                padding: "0 10% 0 3%",
            }}
        >
            {slides.map((slide, index) => (
                <SwiperSlide
                    key={index}
                    className="h-full w-full flex items-center justify-center"
                >
                    {({ isActive }) => (
                        <div
                            className={`
              w-full transition-all duration-300 h-full
              ${isActive ? "opacity-100 scale-100 grayscale-0" : "opacity-40 scale-90 grayscale"}
            `}
                        >
                            <HeroCarouselSlide {...slide} />
                        </div>
                    )}
                </SwiperSlide>
            ))}
            <SlideControls className="right-64 bottom-12 z-40" />
        </Swiper>
    );
};

export default HeroCarousel;
