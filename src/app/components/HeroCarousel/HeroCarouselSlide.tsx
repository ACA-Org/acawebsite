import { FC } from "react";
import { LinkButton } from "@/components/ui/button";
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
    <div className="relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white">

      {/* IMAGE AREA */}
      <div className="relative w-full overflow-hidden">

        {img && (
          <>
            {/* DESKTOP IMAGE - 2880 x 1170 */}
            <DynamicImage
              field={img}
              className="hidden h-auto w-full sm:block"
              priority={props.index === 0}
              loading={props.index === 0 ? "eager" : "lazy"}
            />

            {/* MOBILE IMAGE - 1080 x 1920 */}
            <DynamicImage
              field={img.mobile?.url ? img.mobile : img}
              className="block h-auto w-full sm:hidden"
              priority={props.index === 0}
              loading={props.index === 0 ? "eager" : "lazy"}
            />

            {/* GRADIENT */}
            {(title || desc) && (
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70" />
            )}
          </>
        )}

        {/* TEXT OVERLAY */}
        {(title || desc) && (
          <div className="absolute inset-x-0 bottom-0 z-20 flex w-full min-w-0 flex-col gap-3 p-6 text-white md:p-8 lg:max-w-[650px] lg:p-12">

            {title && (
              <h2 className="heading-2 w-full min-w-0 break-words">
                {title}
              </h2>
            )}

            {desc && (
              <p className="w-full min-w-0 break-words text-base leading-relaxed md:text-lg">
                {desc}
              </p>
            )}

          </div>
        )}
      </div>

      {/* CLICKABLE NAVY FOOTER */}
      {link && (
        <LinkButton
          field={link}
          className="relative z-30 flex w-full items-center justify-between rounded-none border-0 bg-[#0F2D52] px-6 py-5 text-[#FFC72C] no-underline hover:bg-[#123B6B] hover:text-[#FFD65A]"
        >
          <span className="text-lg font-semibold">
            {link.text || "Learn More!"}
          </span>

          <ArrowRight
            className="h-6 w-6 shrink-0"
            aria-hidden="true"
          />
        </LinkButton>
      )}

    </div>
  );
};

export default HeroCarouselSlide;
