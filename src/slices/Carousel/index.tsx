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
        <div className="flex px-19 py-24 flex-col items-start gap-12 w-full h-full [background:linear-gradient(90deg,#0C2545_0%,#081B31_100%)] overflow-visible">
            {(title || subTitle) && (
                <div className="flex flex-col items-start flex-1 gap-6">
                    {tag && (
                        <p className="body-tag uppercase text-blue-50">{tag}</p>
                    )}
                    {title && (
                        <h2 className="heading-2 text-gold-100">{title}</h2>
                    )}
                    {subTitle && (
                        <p className="text-white body-sm">{subTitle}</p>
                    )}
                </div>
            )}
            <Swiper
                modules={[Pagination, Autoplay]}
                wrapperClass="flex !justify-start"
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
                            <LinkTile
                                variation="default"
                                version=""
                                items={[]}
                                slice_type="link_tile"
                                slice_label={null}
                                id="string"
                                primary={{
                                    tileDescription:
                                        slide.carouselSlideDescription,
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
