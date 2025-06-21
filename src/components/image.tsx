"use client";

import { ComponentProps, useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import { PrismicNextImage } from "@prismicio/next";

export type DynamicImageProps = ComponentProps<typeof PrismicNextImage> & {
  priority?: boolean;
  loadingLabel?: string;
};

export const DynamicImage = (props: DynamicImageProps) => {
  const {
    priority = false,
    loadingLabel = "Loading image",
    ...imageProps
  } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (imageProps.onLoad) {
      imageProps.onLoad(event);
    }
  };

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setHasError(true);
    if (imageProps.onError) {
      imageProps.onError(event);
    }
  };

  // If there's an error, show error state
  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 text-sm text-gray-500",
          imageProps.className
        )}
        style={{
          width: imageProps.width || "100%",
          height: imageProps.height || "100px",
        }}
        role="img"
        aria-label={imageProps.alt || "Failed to load image"}
      >
        Failed to load image
      </div>
    );
  }

  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-opacity duration-300";

  return (
    <>
      {!isLoaded && (
        <Skeleton
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label={loadingLabel}
          aria-busy="true"
        />
      )}
      <PrismicNextImage
        {...imageProps}
        loading={priority ? "eager" : imageProps.loading || "lazy"}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          transitionClass,
          !isLoaded ? "opacity-0" : "opacity-100",
          imageProps.className
        )}
        aria-hidden={!isLoaded}
      />
    </>
  );
};

