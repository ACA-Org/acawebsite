import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import CarouselSlide from "./CarouselSlide";
import { LinkButton } from "@/components/ui/button";
import { SlideControls } from "./SlideControls";

// To ensure left alignment, we'll use these styles
const swiperStyle = {
    ".swiper-wrapper": {
        display: "flex",
        justifyContent: "flex-start",
    },
};

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
            carousellink: link,
            carouselslide: slides,
            carouselsubtitle: subTitle,
            carouseltitle: title,
        },
    } = slice;
    return (
        <div className="flex p-8 pt-12 flex-col items-start gap-12 w-full h-full bg-[#EBEBEB] rounded-3xl overflow-visible">
            {(title || subTitle) && (
                <div className="flex flex-col items-start flex-1 gap-6">
                    {title && (
                        <h2 className="text-[#808080] text-5xl leading-[60px] font-bold">
                            {title}
                        </h2>
                    )}
                    {subTitle && (
                        <p className="text-[#808080] font-normal">{subTitle}</p>
                    )}
                </div>
            )}
            <Swiper
                modules={[Pagination, Autoplay]}
                style={swiperStyle as React.CSSProperties}
                spaceBetween={20}
                slidesPerView="auto"
                className="w-full h-full !overflow-visible flex flex-col"
                data-slice-type={slice.slice_type}
                data-slice-variation={slice.variation}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide
                        key={index}
                        className="h-full !w-fit flex items-center justify-center !overflow-visible"
                    >
                        <div
                            className={
                                "transition-all duration-300 h-full overflow-visible"
                            }
                        >
                            <CarouselSlide {...slide} />
                        </div>
                    </SwiperSlide>
                ))}
                <SlideControls className="right-12 -bottom-28" />
            </Swiper>

            {link && (
                <LinkButton
                    variant="default"
                    className="text-white text-lg font-medium pt-4"
                    field={link}
                >
                    {link.text}
                </LinkButton>
            )}
        </div>
    );
};

export default Carousel;
