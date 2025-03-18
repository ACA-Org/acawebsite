import Carousel from "@/slices/Carousel";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Carousel> = {
    component: Carousel,
    render: (args) => {
        return (
            <div className="w-full max-w-[1320px] h-full max-h-[800px]">
                <Carousel {...args} />
            </div>
        );
    },
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
                carouselTitle: "Connect, Learn, and Lead",
                carouselLink: {
                    link_type: "Web",
                    url: "https://google.com",
                    text: "Learn More",
                },
                carouselSubTitle:
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae",
                carouselSlides: [
                    {
                        carouselSlideDescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselSlideBackground: {},
                        carouselSlideTitle: "Conference Title Will Go Here",
                        carouselSlideLocation: "CHICAGO, IL",
                        carouselSlideDate: `2025-04-01T17:00:00+0000`,
                        carouselSlideLink: {
                            link_type: "Web",
                            url: "https://google.com",
                        },
                    },
                    {
                        carouselSlideDescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselSlideBackground: {},
                        carouselSlideTitle: "Conference Title Will Go Here",
                        carouselSlideLocation: "CHICAGO, IL",
                        carouselSlideDate: `2025-04-01T17:00:00+0000`,
                        carouselSlideLink: {
                            link_type: "Web",
                            url: "https://google.com",
                        },
                    },
                    {
                        carouselSlideDescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselSlideBackground: {},
                        carouselSlideTitle: "Conference Title Will Go Here",
                        carouselSlideLocation: "CHICAGO, IL",
                        carouselSlideDate: `2025-04-01T17:00:00+0000`,
                        carouselSlideLink: {
                            link_type: "Web",
                            url: "https://google.com",
                        },
                    },
                    {
                        carouselSlideDescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselSlideBackground: {},
                        carouselSlideTitle: "Conference Title Will Go Here",
                        carouselSlideLocation: "CHICAGO, IL",
                        carouselSlideDate: `2025-04-01T17:00:00+0000`,
                        carouselSlideLink: {
                            link_type: "Web",
                            url: "https://google.com",
                        },
                    },
                    {
                        carouselSlideDescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselSlideBackground: {},
                        carouselSlideTitle: "Conference Title Will Go Here",
                        carouselSlideLocation: "CHICAGO, IL",
                        carouselSlideDate: `2025-04-01T17:00:00+0000`,
                        carouselSlideLink: {
                            link_type: "Web",
                            url: "https://google.com",
                        },
                    },
                    {
                        carouselSlideDescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselSlideBackground: {},
                        carouselSlideTitle: "Conference Title Will Go Here",
                        carouselSlideLocation: "CHICAGO, IL",
                        carouselSlideDate: `2025-04-01T17:00:00+0000`,
                        carouselSlideLink: {
                            link_type: "Web",
                            url: "https://google.com",
                        },
                    },
                ],
            },
        },
    },
};
