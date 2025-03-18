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

// To ensure left alignment, we'll use these styles
const swiperStyle = {
    ".swiper-wrapper": {
        display: "flex",
        justifyContent: "flex-start",
    },
};

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
            socialcarousellink: link,
            socialcarouseldescription: desc,
            socialcarouseltitle: title,
        },
    } = slice;
    return (
        <div className="flex p-8 pt-12 flex-col items-start gap-12 w-full h-full bg-[#808080] rounded-3xl overflow-visible">
            {(title || desc) && (
                <div className="flex justify-between items-start self-stretch">
                    <div className="flex flex-col items-start flex-1 gap-6">
                        {title && (
                            <h2 className="text-white text-5xl leading-[60px] font-bold">
                                {title}
                            </h2>
                        )}
                        {desc && (
                            <p className="text-white font-normal">{desc}</p>
                        )}
                    </div>
                    <div className="gap-4 flex flex-row">
                        <Facebook
                            role="button"
                            className="fill-white h-7 w-auto hover:fill-gray-600 cursor-pointer"
                        />
                        <Instagram
                            role="button"
                            className="fill-white h-7 w-auto hover:fill-gray-600 cursor-pointer"
                        />
                        <LinkedIn
                            role="button"
                            className="fill-white h-7 w-auto hover:fill-gray-600 cursor-pointer"
                        />
                        <X
                            role="button"
                            className="fill-white h-7 w-auto hover:fill-gray-600 cursor-pointer"
                        />
                    </div>
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
                <SlideControls className="right-0 -bottom-28" />
            </Swiper>

            {link && (
                <LinkButton
                    variant="secondary"
                    className="text-lg font-medium pt-4"
                    field={link}
                >
                    {link.text}
                </LinkButton>
            )}
        </div>
    );
};

export default SocialCarousel;
