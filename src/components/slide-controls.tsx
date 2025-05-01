import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSwiper } from "swiper/react";

export const SlideControls = ({
  className,
  variant = "tertiary",
}: {
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
}) => {
  const swiper = useSwiper();
  return (
    <div className={cn("absolute flex flex-row items-start gap-4", className)}>
      <Button
        variant={variant}
        outlined
        onClick={() => swiper.slidePrev()}
        className="aspect-square h-16 w-auto rounded-md shadow-xl"
      >
        <ArrowLeft className="size-6" />
      </Button>
      <Button
        variant={variant}
        outlined
        onClick={() => swiper.slideNext()}
        className="aspect-square h-16 w-auto rounded-md shadow-xl"
      >
        <ArrowRight className="size-6" />
      </Button>
    </div>
  );
};
