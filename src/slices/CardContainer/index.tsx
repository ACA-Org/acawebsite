import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { LinkButton } from "@/components/ui/button";

/**
 * Props for `CardContainer`.
 */
export type CardContainerProps =
  SliceComponentProps<Content.CardContainerSlice>;

/**
 * Component for "CardContainer" Slices.
 */
const CardContainer: FC<CardContainerProps> = ({ slice }) => {
  const {
    primary: { cards, cardContainerTitle, cardContainerDesc },
  } = slice;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full"
    >
      {cardContainerTitle && (
        <h2 className="heading-2 mb-6 text-blue-200">{cardContainerTitle}</h2>
      )}

      {cardContainerDesc && (
        <div className="mb-6 w-full max-w-[900px]">{cardContainerDesc}</div>
      )}

      {cards.length > 1 ? (
        <div className="flex gap-6 max-lg:flex-wrap max-md:flex-col">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col items-stretch gap-4 rounded-xl border border-blue-500/15 bg-white p-6 max-xl:p-4 max-lg:w-[calc(50%-16px)] max-md:w-full lg:flex-1"
            >
              {card.cardImage?.url && (
                <figure className="relative aspect-video overflow-clip rounded-md">
                  <PrismicNextImage
                    field={card.cardImage}
                    className="absolute h-full w-full object-cover"
                  />
                </figure>
              )}

              <div className="mt-2 flex flex-col gap-4">
                {card.cardTitle && (
                  <h3 className="heading-3">{card.cardTitle}</h3>
                )}

                {card.cardDescription && (
                  <div>
                    <PrismicRichText field={card.cardDescription} />
                  </div>
                )}

                {card.cardLink?.text && (
                  <LinkButton field={card.cardLink}>
                    {card.cardLink.text}
                  </LinkButton>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-1 items-center gap-8 rounded-xl border border-blue-500/15 bg-white p-6 max-md:flex-col max-md:gap-6"
            >
              {card.cardImage?.url && (
                <figure className="relative min-h-[245px] w-full max-w-[445px] overflow-clip rounded-md max-md:max-w-none">
                  <PrismicNextImage
                    field={card.cardImage}
                    className="absolute h-full w-full object-cover"
                  />
                </figure>
              )}

              <div className="mt-2 flex flex-1 flex-col gap-4">
                {card.cardTitle && (
                  <h3 className="heading-3">{card.cardTitle}</h3>
                )}

                {card.cardDescription && (
                  <div>
                    <PrismicRichText field={card.cardDescription} />
                  </div>
                )}

                {card.cardLink?.text && (
                  <div className="max-md:w-full">
                    <LinkButton field={card.cardLink} className="max-md:w-full">
                      {card.cardLink.text}
                    </LinkButton>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default CardContainer;
