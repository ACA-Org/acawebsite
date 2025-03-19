import { FC } from "react";

import { CarouselSliceDefaultPrimaryCarouselSlidesItem } from "../../../prismicio-types";
import { cn, Simplify } from "@/lib/utils";

type CarouselSlideProps =
    Simplify<CarouselSliceDefaultPrimaryCarouselSlidesItem> & {
        className?: string;
    };

const CarouselSlide: FC<CarouselSlideProps> = (props) => {
    const {
        carouselSlideDescription: desc,
        carouselSlideTitle: title,
        carouselSlideDate: date,
        carouselSlideLocation: location,
        className,
    } = props;
    return (
        <div>
            <div
                className={cn(
                    "flex gap-2 p-6 flex-col items-center justify-end rounded-2xl bg-[#f9f9f9] h-full text-[#808080] shadow-xl w-[325px] min-h-[500px]",
                    className
                )}
            >
                {(date || location) && (
                    <div className="uppercase flex pb-4 justify-between self-stretch items-start font-medium text-[#808080]">
                        {location && <p>{location}</p>}
                        {date && (
                            <p>
                                {new Date(date).toLocaleString("en-US", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                })}
                            </p>
                        )}
                    </div>
                )}
                {title && (
                    <h2 className="self-stretch text-3xl leading-10 font-bold">
                        {title}
                    </h2>
                )}
                {desc && (
                    <p className="self-stretch text-xl font-normal">{desc}</p>
                )}
            </div>
        </div>
    );
};

export default CarouselSlide;
