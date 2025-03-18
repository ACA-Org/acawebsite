import CarouselSlide from "@/slices/Carousel/CarouselSlide";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CarouselSlide> = {
    component: CarouselSlide,
};

export default meta;
type Story = StoryObj<typeof CarouselSlide>;

export const Primary: Story = {
    args: {
        carouselslidedescription: "Lorem ipsum dolor sit amet...",
        carouselslidetitle: "Conference Title Will Go Here",
        carouselslidelocation: "Chicago",
        carouselslidedate: `2025-04-01T17:00:00+0000`,
        carouselslidelink: {
            link_type: "Web",
            url: "https://google.com",
            text: "Slide Link",
        },
        className: "w-[385px] h-[485px]",
    },
};
