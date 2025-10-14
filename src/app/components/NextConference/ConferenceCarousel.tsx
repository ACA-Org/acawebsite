"use client";

import { SliceZone } from "@prismicio/client";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { ConferenceCardSlice } from "../../../../prismicio-types";
import ConferenceCard from "@/slices/ConferenceCard";
import { SlideControls } from "@/components/slide-controls";
import { Pagination } from "swiper/modules";
import { useEffect, useRef, useState } from "react";

export const ConferenceCarousel = ({
  slices,
}: {
  slices: SliceZone<ConferenceCardSlice>;
}) => {
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
    <>
      {slices?.length && slices.length > 3 ? (
        <Swiper
          modules={[Pagination]}
          className="!static h-full w-full"
          containerModifierClass="static"
          spaceBetween={24}
          slidesPerView={1}
          pagination={false}
          style={{
            position: "static",
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          ref={swiperRef}
        >
          {slices.map((slice, index) => (
            <SwiperSlide
              key={`${slice.id}-${index}`}
              className="flex h-full w-full items-center justify-center"
            >
              <ConferenceCard {...slice} key={index} />
            </SwiperSlide>
          ))}
          {showControls && <SlideControls className="right-0 bottom-0 z-40" />}
        </Swiper>
      ) : (
        <div className="flex gap-6 max-md:flex-col">
          <div className="flex gap-6 max-lg:flex-col">
            {slices.map((slice, index) => (
              <div className="flex-1" key={index}>
                <ConferenceCard {...slice} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
