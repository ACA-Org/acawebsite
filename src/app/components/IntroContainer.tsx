import { LinkButton } from "@/components/ui/button";
import { GroupField, KeyTextField, LinkField } from "@prismicio/client";
import {
  HomepageDocumentDataIntroImageTileItem,
  Simplify,
} from "../../../prismicio-types";
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
    <div className="mx-auto w-full max-w-[1440px] px-4 py-12 md:px-8">
      <div className="flex items-center justify-between gap-16 bg-[#F9F9F9] max-lg:flex-col-reverse">
        <div className="flex flex-col items-start gap-6">
          {introHeader && (
            <h2 className="heading-2 self-stretch">{introHeader}</h2>
          )}
          {introDescription && (
            <p className="body-md self-stretch">{introDescription}</p>
          )}
          {introAction && (
            <LinkButton className="pt-4" field={introAction}>
              {introAction.text}
            </LinkButton>
          )}
        </div>
        <div className="grid h-full w-full grid-cols-2 gap-6 max-lg:gap-4">
          {introImages.map((item, index) => (
            <ImageFader key={index} images={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default IntroContainer;
