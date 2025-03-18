import HeroCarouselSlide from "@/app/components/HeroCarousel/HeroCarouselSlide";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof HeroCarouselSlide> = {
    component: HeroCarouselSlide,
};

export default meta;
type Story = StoryObj<typeof HeroCarouselSlide>;

export const Primary: Story = {
    args: {
        herocarouseldescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        herocarouseltitle: "Slide Title (H2)",
        herocarousellink: {
            link_type: "Web",
            url: "https://google.com",
            text: "Slide Link",
        },
    },
};
