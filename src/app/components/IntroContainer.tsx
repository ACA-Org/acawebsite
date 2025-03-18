import { Simplify } from "@/lib/utils";
import { HomepageDocumentDataIntroImagesItem } from "../../../prismicio-types";
import { LinkButton } from "@/components/ui/button";
import { KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

type IntroContainerProps = {
    introImages: Simplify<HomepageDocumentDataIntroImagesItem>[];
    introHeader?: KeyTextField;
    introDescription?: KeyTextField;
    introAction?: LinkField | null;
};

export const IntroContainer = (props: IntroContainerProps) => {
    const { introAction, introDescription, introHeader, introImages } = props;
    return (
        <div className="flex justify-between items-center bg-[#F9F9F9] px-20 py-12">
            <div className="flex flex-col items-start gap-6 shrink-0">
                {introHeader && (
                    <h2 className="self-stretch text-[#808080] text-5xl font-bold leading-[normal]">
                        {introHeader}
                    </h2>
                )}
                {introDescription && (
                    <p className="self-stretch text-[#808080] text-5xl font-bold leading-[normal]">
                        {introDescription}
                    </p>
                )}
                {introAction && (
                    <LinkButton className="pt-4" field={introAction}>
                        {introAction.text}
                    </LinkButton>
                )}
            </div>
            <div className="flex h-full flex-col items-start gap-6 shrink-0">
                {introImages.map((item, index) => (
                    <PrismicNextImage key={index} field={item.introImage} />
                ))}
            </div>
        </div>
    );
};
