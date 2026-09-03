import { FC } from "react";
import { PrismicLink } from "@prismicio/react";
import {
  HomepageDocumentDataHeroCarouselDataItem,
  Simplify,
} from "../../../../prismicio-types";
import { DynamicImage } from "@/components/image";
import { ArrowRight } from "lucide-react";

export type HeroCarouselSlideProps =
  Simplify<HomepageDocumentDataHeroCarouselDataItem> & { index?: number };

const HeroCarouselSlide: FC<HeroCarouselSlideProps> = (props) => {
  const {
    heroCarouselDescription: desc,
    heroCarouselLink: link,
    heroCarouselTitle: title,
    heroCarouselBackground: img,
  } = props;

  return (
    <div className="relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white max-lg:min-h-[420px] lg:min-h-[635px]">
      {/* Image / content area */}
      <div className="relative flex min-h-0 flex-1 flex-col justify-end overflow-hidden">
        {img && (
          <>
            <div className="absolute inset-0 h-full w-full">
              <DynamicImage
                field={img}
                className="hidden h-full w-full object-cover sm:flex"
                priority={props.index === 0}
                loading={props.index === 0 ? "eager" : "lazy"}
              />

              <DynamicImage
                field={img.mobile?.url ? img.mobile : img}
                className="flex h-full w-full object-cover sm:hidden"
                priority={props.index === 0}
                loading={props.index === 0 ? "eager" : "lazy"}
              />
            </div>

            {(desc || title) && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/85" />
            )}
          </>
        )}

        {/* Text content */}
        <div className="relative z-20 flex w-full min-w-0 flex-col gap-3 p-5 text-white md:p-8 lg:max-w-[650px] lg:p-12">
          {title && (
            <h2 className="heading-2 w-full min-w-0 break-words">
              {title}
            </h2>
          )}

          {desc && (
            <p className="w-full min-w-0 break-words">
              {desc}
            </p>
          )}
        </div>
      </div>

      {/* Clickable footer */}
      {link && (
        <PrismicLink
          field={link}
          className="relative z-30 flex w-full items-center justify-between gap-4 bg-blue-300 px-5 py-4 text-white no-underline transition-colors hover:bg-gold-100 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-100 md:px-8"
        >
          <span className="font-semibold">
            {link.text || "Learn More"}
          </span>

          <ArrowRight
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
          />
        </PrismicLink>
      )}
    </div>
  );
};

export default HeroCarouselSlide;
