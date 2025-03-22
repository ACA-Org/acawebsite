import { Simplify } from "@/lib/utils";
import { LinkButton } from "@/components/ui/button";
import { GroupField, KeyTextField, LinkField } from "@prismicio/client";
import { HomepageDocumentDataIntroImageTileItem } from "../../../prismicio-types";
import ImageFader from "@/components/image-fader";

type IntroContainerProps = {
    introImages: GroupField<Simplify<HomepageDocumentDataIntroImageTileItem>>;
    introHeader?: KeyTextField;
    introDescription?: KeyTextField;
    introAction?: LinkField | null;
};

const IntroContainer = (props: IntroContainerProps) => {
    const { introAction, introDescription, introHeader, introImages } = props;

    return (
        <div className="flex justify-between items-center bg-[#F9F9F9] gap-16 px-20 py-12 w-full h-full">
            <div className="flex flex-col items-start gap-6">
                {introHeader && (
                    <h2 className="self-stretch heading-2">{introHeader}</h2>
                )}
                {introDescription && (
                    <p className="self-stretch body-md">{introDescription}</p>
                )}
                {introAction && (
                    <LinkButton className="pt-4" field={introAction}>
                        {introAction.text}
                    </LinkButton>
                )}
            </div>
            <div className="h-full grid grid-cols-2 gap-6 w-full">
                {introImages.map((item, index) => (
                    <ImageFader key={index} images={item} />
                ))}
            </div>
        </div>
    );
};
export default IntroContainer;
