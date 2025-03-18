import HeroCarousel from "@/app/components/HeroCarousel";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof HeroCarousel> = {
    component: HeroCarousel,
};

export default meta;
type Story = StoryObj<typeof HeroCarousel>;

export const Primary: Story = {
    args: {
        slides: [
            {
                heroCarouselBackground: {},
                heroCarouselDescription:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                heroCarouselTitle: "Slide Title (H2)",
                heroCarouselLink: {
                    link_type: "Web",
                    url: "https://google.com",
                    text: "Slide Link",
                },
            },
            {
                heroCarouselBackground: {},
                heroCarouselDescription:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                heroCarouselTitle: "Slide Title (H2)",
                heroCarouselLink: {
                    link_type: "Web",
                    url: "https://google.com",
                    text: "Slide Link",
                },
            },
            {
                heroCarouselBackground: {},
                heroCarouselDescription:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                heroCarouselTitle: "Slide Title (H2)",
                heroCarouselLink: {
                    link_type: "Web",
                    url: "https://google.com",
                    text: "Slide Link",
                },
            },
            {
                heroCarouselBackground: {},
                heroCarouselDescription:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                heroCarouselTitle: "Slide Title (H2)",
                heroCarouselLink: {
                    link_type: "Web",
                    url: "https://google.com",
                    text: "Slide Link",
                },
            },
        ],
    },
};
