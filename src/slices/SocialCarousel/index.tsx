"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button, LinkButton } from "@/components/ui/button";
import { X } from "@/icons/X";
import { LinkedIn } from "@/icons/LinkedIn";
import { Instagram } from "@/icons/Instagram";
import { Facebook } from "@/icons/Facebook";
import Link from "next/link";
import { LinkedInPost } from "@/app/api/linkedin/posts/route";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/linkedin/posts");
        const result = await response.json();
        if (result.success && result.data) {
          setPosts(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch LinkedIn posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
                prefetch={false}
                rel="noreferrer noopener"
                target="_blank"
                href="https://www.facebook.com/AmericanCorrectionalAssociation"
                aria-label="Visit ACA on Facebook"
              >
                <Facebook className="hover:fill-gold-100 h-7 w-auto cursor-pointer fill-blue-300 transition-colors" />
              </Link>
              <Link
                prefetch={false}
                rel="noreferrer noopener"
                target="_blank"
                href="https://www.instagram.com/amercorrectionalassoc"
                aria-label="Visit ACA on Instagram"
              >
                <Instagram className="hover:fill-gold-100 h-7 w-auto cursor-pointer fill-blue-300 transition-colors" />
              </Link>
              <Link
                prefetch={false}
                rel="noreferrer noopener"
                target="_blank"
                href="https://www.linkedin.com/company/american-correctional-association/mycompany/?viewAsMember=true"
                aria-label="Visit ACA on LinkedIn"
              >
                <LinkedIn className="hover:fill-gold-100 h-7 w-auto cursor-pointer fill-blue-300 transition-colors" />
              </Link>
              <Link
                prefetch={false}
                rel="noreferrer noopener"
                target="_blank"
                href="https://twitter.com/ACAinfo"
                aria-label="Visit ACA on X (formerly Twitter)"
              >
                <X className="hover:fill-gold-100 h-7 w-auto cursor-pointer fill-blue-300 transition-colors" />
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
            ref={swiperRef}
            spaceBetween={20}
            slidesPerView="auto"
            className="flex h-full w-full flex-col !overflow-visible"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
          >
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex h-full !w-fit items-center justify-center !overflow-visible"
                  >
                    <div className="aspect-square h-[300px] animate-pulse overflow-visible rounded-xl bg-white shadow-2xl transition-all duration-300" />
                  </SwiperSlide>
                ))
              : // Posts
                posts.map((post) => (
                  <SwiperSlide
                    key={post.id}
                    className="flex h-full !w-fit items-center justify-center !overflow-visible"
                  >
                    <Link
                      href={post.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full w-auto"
                    >
                      <div className="hover:shadow-3xl h-[300px] overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300">
                        <img
                          src={post.images[0] || "/aca_square.png"}
                          alt={`Post by ${post.author}`}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>

        <div className="flex w-full flex-row items-center justify-end gap-4">
          {link.text && (
            <div className="flex w-full items-center justify-between">
              <LinkButton
                variant="primary"
                outlined
                className="pt-4 text-lg font-medium"
                field={link}
              >
                {link.text}
              </LinkButton>
            </div>
          )}
          <div className="flex flex-row items-center gap-4">
            <Button
              variant="primary"
              outlined
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              className="aspect-square h-[52px] w-auto rounded-md shadow-xl"
              aria-label="Previous slide"
            >
              <ArrowLeft className="size-6" />
            </Button>
            <Button
              variant="primary"
              outlined
              onClick={() => swiperRef.current?.swiper.slideNext()}
              className="aspect-square h-[52px] w-auto rounded-md shadow-xl"
              aria-label="Next slide"
            >
              <ArrowRight className="size-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SocialCarousel;
