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
import Link from "next/link";

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
    <div className="mx-auto w-full max-w-[1440px] p-4 md:px-8">
      <div className="relative flex w-full flex-col items-start gap-16 overflow-clip rounded-2xl border border-solid border-[#0f2d5226] bg-blue-50 px-8 pt-12 pb-8">
        <div className="w-full p-0">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-1 grow flex-col items-start gap-6">
              {title && <h2 className="heading-2 text-blue-300">{title}</h2>}

              {desc && (
                <p className="body-md w-full max-w-[900px] text-gray-300">
                  {desc}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Link
                rel="noreferrer noopener"
                target="_blank"
                href="https://www.facebook.com/AmericanCorrectionalAssociation"
              >
                <Facebook className="hover:fill-gold-100 h-7 w-auto cursor-pointer fill-white transition-colors" />
              </Link>
              <Link
                rel="noreferrer noopener"
                target="_blank"
                href="https://www.facebook.com/AmericanCorrectionalAssociation"
              >
                <Instagram className="hover:fill-gold-100 h-7 w-auto cursor-pointer fill-white transition-colors" />
              </Link>
              <Link
                rel="noreferrer noopener"
                target="_blank"
                href="https://www.facebook.com/AmericanCorrectionalAssociation"
              >
                <LinkedIn className="hover:fill-gold-100 h-7 w-auto cursor-pointer fill-white transition-colors" />
              </Link>
              <Link
                rel="noreferrer noopener"
                target="_blank"
                href="https://twitter.com/ACAinfo"
              >
                <X className="hover:fill-gold-100 h-7 w-auto cursor-pointer fill-white transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full p-0">
          <Swiper
            modules={[Pagination, Autoplay]}
            wrapperClass="flex !justify-start"
            style={{
              position: "static",
            }}
            spaceBetween={20}
            slidesPerView="auto"
            className="flex h-full w-full flex-col !overflow-visible"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((slide, index) => (
              <SwiperSlide
                key={index}
                className="flex h-full !w-fit items-center justify-center !overflow-visible"
              >
                <div
                  className={
                    "aspect-square h-[300px] overflow-visible rounded-xl bg-white shadow-2xl transition-all duration-300"
                  }
                >
                  <p className="text-muted-foreground flex h-full items-center justify-center text-9xl">
                    {slide}
                  </p>
                </div>
              </SwiperSlide>
            ))}
            <SlideControls variant="primary" className="right-8 bottom-8" />
          </Swiper>
        </div>

        <div className="flex w-full items-center justify-between">
          {link && (
            <LinkButton
              variant="primary"
              outlined
              className="pt-4 text-lg font-medium"
              field={link}
            >
              {link.text}
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
};
export default SocialCarousel;
