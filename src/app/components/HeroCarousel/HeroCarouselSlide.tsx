import { FC } from "react";
import { LinkButton } from "@/components/ui/button";
import { HomepageDocumentDataHeroCarouselDataItem } from "../../../../prismicio-types";
import { Simplify } from "@/lib/utils";
import { PrismicNextImage } from "@prismicio/next";

export type HeroCarouselSlideProps =
    Simplify<HomepageDocumentDataHeroCarouselDataItem>;

const HeroCarouselSlide: FC<HeroCarouselSlideProps> = (props) => {
    const {
        heroCarouselDescription: desc,
        heroCarouselLink: link,
        heroCarouselTitle: title,
        heroCarouselBackground: img,
    } = props;
    return (
        <div className="flex p-12 flex-col items-center justify-end rounded-2xl h-full w-full min-h-[635px] relative overflow-clip">
            {img && (
                <>
                    <div className="absolute inset-0 w-full h-full">
                        <PrismicNextImage
                            field={img}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-bl from-[rgba(32,32,32,0)] via-20% via-transparent  to-[#0F0F0F]" />
                    </div>
                </>
            )}
            <div className="flex items-end gap-16 self-stretch z-20 max-w-[650px]">
                <div className="text-white flex w-full flex-col items-start gap-4">
                    {title && (
                        <h2 className="self-stretch heading-2">{title}</h2>
                    )}
                    {desc && <p>{desc}</p>}
                    {link && (
                        <LinkButton
                            variant="tertiary"
                            outlined
                            className="pt-4"
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

export default HeroCarouselSlide;
