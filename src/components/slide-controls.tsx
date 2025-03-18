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
                variant={"secondary"}
                size={"icon"}
                onClick={() => swiper.slidePrev()}
                className="h-16 w-auto aspect-square bg-white shadow-xl"
            >
                <ArrowLeft className="size-6 stroke-[#808080]" />
            </Button>
            <Button
                variant={"secondary"}
                size={"icon"}
                onClick={() => swiper.slideNext()}
                className="h-16 w-auto aspect-square bg-white shadow-xl"
            >
                <ArrowRight className="size-6 stroke-[#808080]" />
            </Button>
        </div>
    );
};
