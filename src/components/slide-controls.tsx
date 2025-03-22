import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSwiper } from "swiper/react";

export const SlideControls = ({ className }: { className?: string }) => {
    const swiper = useSwiper();
    return (
        <div
            className={cn(
                "flex flex-row items-start gap-4 absolute",
                className
            )}
        >
            <Button
                variant={"tertiary"}
                outlined
                onClick={() => swiper.slidePrev()}
                className="h-16 w-auto aspect-square shadow-xl rounded-md"
            >
                <ArrowLeft className="size-6" />
            </Button>
            <Button
                variant={"tertiary"}
                outlined
                onClick={() => swiper.slideNext()}
                className="h-16 w-auto aspect-square shadow-xl rounded-md"
            >
                <ArrowRight className="size-6" />
            </Button>
        </div>
    );
};
