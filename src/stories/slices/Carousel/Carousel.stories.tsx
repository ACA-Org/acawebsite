import Carousel from "@/slices/Carousel";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Carousel> = {
    component: Carousel,
    render: (args) => {
        return (
            <div className="w-full max-w-[1320px] h-fit">
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
                carouselTag: "Our Goals",
                carouselSubTitle:
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae",
                carouselSlides: [
                    {
                        carouselSlideDescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselSlideBackground: {
                            url: "https://images.unsplash.com/photo-1591553161262-0eeddc1f5c23",
                            id: "",
                            copyright: "",
                            dimensions: {
                                height: 3168,
                                width: 4752,
                            },
                            edit: {
                                x: 0,
                                y: 0,
                                zoom: 1,
                                background: "transparent",
                            },
                            alt: "tall",
                        },
                        carouselSlideTitle: "Conference Title Will Go Here",
                        carouselSlideLink: {
                            link_type: "Web",
                            url: "https://google.com",
                            text: "Learn More",
                        },
                    },
                    {
                        carouselSlideDescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselSlideBackground: {
                            url: "https://images.unsplash.com/photo-1591553161262-0eeddc1f5c23",
                            id: "",
                            copyright: "",
                            dimensions: {
                                height: 3168,
                                width: 4752,
                            },
                            edit: {
                                x: 0,
                                y: 0,
                                zoom: 1,
                                background: "transparent",
                            },
                            alt: "tall",
                        },
                        carouselSlideTitle: "Conference Title Will Go Here",
                        carouselSlideLink: {
                            link_type: "Web",
                            url: "https://google.com",
                            text: "Learn More",
                        },
                    },
                    {
                        carouselSlideDescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselSlideBackground: {
                            url: "https://images.unsplash.com/photo-1591553161262-0eeddc1f5c23",
                            id: "",
                            copyright: "",
                            dimensions: {
                                height: 3168,
                                width: 4752,
                            },
                            edit: {
                                x: 0,
                                y: 0,
                                zoom: 1,
                                background: "transparent",
                            },
                            alt: "tall",
                        },
                        carouselSlideTitle: "Conference Title Will Go Here",
                        carouselSlideLink: {
                            link_type: "Web",
                            text: "Learn More",
                            url: "https://google.com",
                        },
                    },
                    {
                        carouselSlideDescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselSlideBackground: {
                            url: "https://images.unsplash.com/photo-1591553161262-0eeddc1f5c23",
                            id: "",
                            copyright: "",
                            dimensions: {
                                height: 3168,
                                width: 4752,
                            },
                            edit: {
                                x: 0,
                                y: 0,
                                zoom: 1,
                                background: "transparent",
                            },
                            alt: "tall",
                        },
                        carouselSlideTitle: "Conference Title Will Go Here",
                        carouselSlideLink: {
                            link_type: "Web",
                            text: "Learn More",
                            url: "https://google.com",
                        },
                    },
                    {
                        carouselSlideDescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselSlideBackground: {
                            url: "https://images.unsplash.com/photo-1591553161262-0eeddc1f5c23",
                            id: "",
                            copyright: "",
                            dimensions: {
                                height: 3168,
                                width: 4752,
                            },
                            edit: {
                                x: 0,
                                y: 0,
                                zoom: 1,
                                background: "transparent",
                            },
                            alt: "tall",
                        },
                        carouselSlideTitle: "Conference Title Will Go Here",
                        carouselSlideLink: {
                            link_type: "Web",
                            text: "Learn More",
                            url: "https://google.com",
                        },
                    },
                    {
                        carouselSlideDescription:
                            "Lorem ipsum dolor sit amet...",
                        carouselSlideBackground: {
                            url: "https://images.unsplash.com/photo-1591553161262-0eeddc1f5c23",
                            id: "",
                            copyright: "",
                            dimensions: {
                                height: 3168,
                                width: 4752,
                            },
                            edit: {
                                x: 0,
                                y: 0,
                                zoom: 1,
                                background: "transparent",
                            },
                            alt: "tall",
                        },
                        carouselSlideTitle: "Conference Title Will Go Here",
                        carouselSlideLink: {
                            link_type: "Web",
                            text: "Learn More",
                            url: "https://google.com",
                        },
                    },
                ],
            },
        },
    },
};
