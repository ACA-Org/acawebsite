import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

export const ConferenceCard = ({ image }: { image: ImageField }) => {
    return (
        <div className="flex w-[340px] h-[350px] flex-col justify-end items-center gap-2 p-6 rounded-lg">
            <PrismicNextImage
                className="h-full w-full object-cover"
                field={image}
            />
        </div>
    );
};
