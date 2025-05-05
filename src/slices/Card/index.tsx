import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Button, LinkButton } from "@/components/ui/button";

/**
 * Props for `Card`.
 */
export type CardProps = SliceComponentProps<Content.CardSlice>;

/**
 * Component for "Card" Slices.
 */
const Card: FC<CardProps> = ({ slice }) => {
  const {
    primary: { cardContent, cardImage, cardLink, cardTitle },
  } = slice;

  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full bg-blue-50"
    >
      {cardImage.url && (
        <figure>
          <PrismicNextImage field={cardImage} />
        </figure>
      )}

      {cardTitle && <h3 className="heading-3">{cardTitle}</h3>}

      {cardContent && (
        <div>
          <PrismicRichText field={cardContent} />
        </div>
      )}

      {cardLink && cardLink.text && (
        <LinkButton field={cardLink}>{cardLink.text}</LinkButton>
      )}
    </div>
  );
};

export default Card;
