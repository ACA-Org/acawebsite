"use client";

import { FC } from "react";
import React, { useEffect, useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import {
  HomepageDocumentDataIntroImageTileItem,
  Simplify,
} from "../../prismicio-types";

/**
 * Props for `ImageFader`.
 */
export type ImageFaderProps = {
  images: Simplify<HomepageDocumentDataIntroImageTileItem>;
};

/**
 * Component for "ImageFader" Slices.
 */
const ImageFader: FC<ImageFaderProps> = ({
  images: { introImage1, introImage2 },
}) => {
  const images = [introImage1, introImage2];
  const interval = 5000;
  const fadeDuration = 1000;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const cycleImages = () => {
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images?.length);
      }, fadeDuration);
    };

    const timer = setInterval(cycleImages, interval);
    return () => clearInterval(timer);
  }, [images?.length]);

  return (
    <div className="col-span-1 relative w-full h-[235px] overflow-hidden rounded-lg bg-black">
      {images.map((img, index) => (
        <PrismicNextImage
          key={index}
          field={img}
          alt=""
          priority
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`absolute inset-0 object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};

export default React.memo(ImageFader);
