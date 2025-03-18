import Carousel from "@/slices/Carousel";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Carousel> = {
    component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Primary: Story = {
    args: {
        slice: {
            variation: "default",
            version: "",
            items: [],
            slice_type: "carousel",
            id: "123",
            slice_label: null,
            primary: {
                carouseltitle: "Connect, Learn, and Lead",
                carousellink: {
                    link_type: "Web",
                    url: "https://google.com",
                    text: "Learn More",
                },
                carouselsubtitle:
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae",
                carouselslide: [
                    {
                        carouselslidedescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselslidebackground: {},
                        carouselslidetitle: "Conference Title Will Go Here",
                        carouselslidelocation: "Chicago",
                        carouselslidedate: `2025-04-01T17:00:00+0000`,
                        carouselslidelink: {
                            link_type: "Web",
                            url: "https://google.com",
                        },
                    },
                    {
                        carouselslidedescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselslidebackground: {},
                        carouselslidetitle: "Conference Title Will Go Here",
                        carouselslidelocation: "Chicago",
                        carouselslidedate: `2025-04-01T17:00:00+0000`,
                        carouselslidelink: {
                            link_type: "Web",
                            url: "https://google.com",
                        },
                    },
                    {
                        carouselslidedescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselslidebackground: {},
                        carouselslidetitle: "Conference Title Will Go Here",
                        carouselslidelocation: "Chicago",
                        carouselslidedate: `2025-04-01T17:00:00+0000`,
                        carouselslidelink: {
                            link_type: "Web",
                            url: "https://google.com",
                        },
                    },
                    {
                        carouselslidedescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselslidebackground: {},
                        carouselslidetitle: "Conference Title Will Go Here",
                        carouselslidelocation: "Chicago",
                        carouselslidedate: `2025-04-01T17:00:00+0000`,
                        carouselslidelink: {
                            link_type: "Web",
                            url: "https://google.com",
                        },
                    },
                    {
                        carouselslidedescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselslidebackground: {},
                        carouselslidetitle: "Conference Title Will Go Here",
                        carouselslidelocation: "Chicago",
                        carouselslidedate: `2025-04-01T17:00:00+0000`,
                        carouselslidelink: {
                            link_type: "Web",
                            url: "https://google.com",
                        },
                    },
                    {
                        carouselslidedescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselslidebackground: {},
                        carouselslidetitle: "Conference Title Will Go Here",
                        carouselslidelocation: "Chicago",
                        carouselslidedate: `2025-04-01T17:00:00+0000`,
                        carouselslidelink: {
                            link_type: "Web",
                            url: "https://google.com",
                        },
                    },
                ],
            },
        },
    },
};
