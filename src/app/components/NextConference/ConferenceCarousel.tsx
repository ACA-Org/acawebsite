"use client";

import { SliceZone } from "@prismicio/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { ConferenceCardSlice } from "../../../../prismicio-types";
import ConferenceCard from "@/slices/ConferenceCard";
import { SlideControls } from "@/components/slide-controls";
import { Pagination } from "swiper/modules";

export const ConferenceCarousel = ({
    slices,
}: {
    slices: SliceZone<ConferenceCardSlice>;
}) => {
    return (
        <Swiper
            modules={[Pagination]}
            className="w-full h-full !static"
            containerModifierClass="static"
            spaceBetween={1}
            slidesPerView={3.75}
            pagination={false}
            style={{
                position: "static",
            }}
        >
            {slices.map((slice, index) => (
                <SwiperSlide
                    key={`${slice.id}-${index}`}
                    className="h-full w-full flex items-center justify-center"
                >
                    <ConferenceCard {...slice} key={index} />
                </SwiperSlide>
            ))}
            <SlideControls className="right-19 bottom-24 z-40" />
        </Swiper>
    );
};
