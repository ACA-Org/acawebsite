"use client";
import { FC } from "react";
import Marquee from "react-fast-marquee";
import { Content } from "@prismicio/client";
import { PrismicLink, SliceComponentProps } from "@prismicio/react";
import { DynamicImage } from "@/components/image";

/**
 * Props for `LogoTicker`.
 */
export type LogoTickerProps = SliceComponentProps<Content.LogoTickerSlice>;

/**
 * Component for "LogoTicker" Slices.
 */
const LogoTicker: FC<LogoTickerProps> = ({ slice }) => {
  const {
    primary: { logos },
  } = slice;

  if (!logos || logos.length === 0) return null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full overflow-hidden py-12"
    >
      <Marquee gradient={false} speed={40} pauseOnHover={true}>
        {logos.map((logo, i) => (
          <>
            {logo.logoLink.text ? (
              <PrismicLink
                field={logo.logoLink}
                key={
                  logo.logoItem?.id + `${i}` ||
                  logo.logoItem?.url + `${i}` ||
                  `logo-${i}`
                }
              >
                <div className="mx-4 flex-shrink-0">
                  <DynamicImage
                    field={logo.logoItem}
                    className="max-h-[100px] w-auto"
                  />
                </div>
              </PrismicLink>
            ) : (
              <div
                key={
                  logo.logoItem?.id + `${i}` ||
                  logo.logoItem?.url + `${i}` ||
                  `logo-${i}`
                }
                className="mx-4 flex-shrink-0"
              >
                <DynamicImage
                  field={logo.logoItem}
                  className="max-h-[100px] w-auto"
                />
              </div>
            )}
          </>
        ))}
      </Marquee>
    </section>
  );
};

export default LogoTicker;
