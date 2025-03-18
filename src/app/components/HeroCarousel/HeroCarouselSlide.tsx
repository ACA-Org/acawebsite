import { FC } from "react";
import { LinkButton } from "@/components/ui/button";
import { HomepageDocumentDataHeroCarouselDataItem } from "../../../../prismicio-types";
import { Simplify } from "@/lib/utils";

export type HeroCarouselSlideProps =
    Simplify<HomepageDocumentDataHeroCarouselDataItem>;

const HeroCarouselSlide: FC<HeroCarouselSlideProps> = (props) => {
    const {
        heroCarouselDescription: desc,
        heroCarouselLink: link,
        heroCarouselTitle: title,
    } = props;
    return (
        <div className="flex p-12 flex-col items-center justify-end rounded-2xl bg-[#A2A2A2] h-full w-full">
            <div className="flex items-end gap-16 self-stretch">
                <div className="text-white flex w-full flex-col items-start gap-4">
                    {title && (
                        <h2 className="self-stretch text-5xl font-bold">
                            {title}
                        </h2>
                    )}
                    {desc && <p>{desc}</p>}
                    {link && (
                        <LinkButton
                            variant="secondary"
                            className="text-[#808080] text-lg font-medium pt-4"
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
