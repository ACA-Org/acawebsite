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
                onClick={() => swiper.slidePrev()}
                className="h-16 w-auto aspect-square bg-blue-100 hover:bg-gold-100 shadow-xl rounded-md"
            >
                <ArrowLeft className="size-6 stroke-blue-300" />
            </Button>
            <Button
                variant={"secondary"}
                onClick={() => swiper.slideNext()}
                className="h-16 w-auto aspect-square bg-blue-100 hover:bg-gold-100 shadow-xl rounded-md"
            >
                <ArrowRight className="size-6 stroke-blue-300" />
            </Button>
        </div>
    );
};
