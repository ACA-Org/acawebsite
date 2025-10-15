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
    <>
      <div
        className={cn(
          "absolute hidden flex-row justify-end gap-4 lg:flex lg:items-start",
          className
        )}
        role="group"
        aria-label="Carousel Navigation"
      >
        <Button
          variant={variant}
          outlined
          onClick={() => swiper.slidePrev()}
          className="aspect-square h-[52px] w-auto rounded-md shadow-xl"
          aria-label="Previous slide"
        >
          <ArrowLeft className="size-6" />
        </Button>
        <Button
          variant={variant}
          outlined
          onClick={() => swiper.slideNext()}
          className="aspect-square h-[52px] w-auto rounded-md shadow-xl"
          aria-label="Next slide"
        >
          <ArrowRight className="size-6" />
        </Button>
      </div>
      <div
        className={cn(
          "absolute flex flex-row justify-end gap-4 max-lg:relative lg:hidden lg:items-start",
          className
        )}
        role="group"
        aria-label="Carousel Navigation"
      >
        <Button
          variant="primary"
          outlined
          onClick={() => swiper.slidePrev()}
          className="aspect-square h-[52px] w-auto rounded-md shadow-xl"
          aria-label="Previous slide"
        >
          <ArrowLeft className="size-6" />
        </Button>
        <Button
          variant="primary"
          outlined
          onClick={() => swiper.slideNext()}
          className="aspect-square h-[52px] w-auto rounded-md shadow-xl"
          aria-label="Next slide"
        >
          <ArrowRight className="size-6" />
        </Button>
      </div>
    </>
  );
};
