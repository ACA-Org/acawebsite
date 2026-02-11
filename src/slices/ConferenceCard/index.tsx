import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { DynamicImage } from "@/components/image";
import { LinkButton } from "@/components/ui/button";

/**
 * Props for `ConferenceCard`.
 */
export type ConferenceCardProps =
  SliceComponentProps<Content.ConferenceCardSlice>["slice"];

/**
 * Component for "ConferenceCard" Slices.
 */
const ConferenceCard: FC<ConferenceCardProps> = (slice) => {
  if (!slice.primary) return null;

  const {
    primary: {
      conferenceCardImage: image,
      conferenceCardTitle: title,
      conferenceCardDesc: desc,
      conferenceCardLink: link,
    },
  } = slice;

  const hasButton =
    link && typeof link === "object" && (link.text?.trim() ?? "") !== "";

  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`group relative flex h-[350px] flex-col items-center justify-end gap-2 overflow-clip rounded-lg p-6`}
    >
      {image && (
        <>
          <div className="absolute inset-0 h-full w-full">
            <DynamicImage
              field={image}
              className="h-full w-full object-cover transition-opacity duration-250 ease-in-out group-hover:opacity-40 max-md:opacity-40"
            />
            <div
              className={
                hasButton
                  ? "absolute inset-0 bg-gradient-to-b from-[rgba(32,32,32,0)] via-transparent via-20% to-[#0F0F0F] transition-opacity duration-300 ease-in-out group-hover:via-[rgba(15,15,15,0.6)] group-hover:to-[rgba(15,15,15,1)] max-md:via-[rgba(15,15,15,0.6)] max-md:to-[rgba(15,15,15,1)]"
                  : "absolute inset-0 bg-gradient-to-b from-[rgba(32,32,32,0)] via-[rgba(15,15,15,0.3)] via-20% to-[rgba(15,15,15,0.5)]"
              }
            />
          </div>
        </>
      )}
      <div
        className={
          hasButton
            ? "z-20 flex translate-y-[84px] transform items-end gap-16 self-stretch transition-transform duration-300 ease-in-out group-hover:translate-y-0 max-md:translate-y-0"
            : "z-20 flex transform items-end gap-16 self-stretch"
        }
      >
        <div
          className={`flex w-full flex-col items-start gap-4 text-white ${!hasButton ? "pb-4" : ""}`}
        >
          {title && (
            <h2 className="heading-3 self-stretch font-semibold">{title}</h2>
          )}
          {desc && <p className="body-sm">{desc}</p>}
          {hasButton && (
            <LinkButton
              variant="tertiary"
              outlined
              className="mt-4 w-full"
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

export default ConferenceCard;
