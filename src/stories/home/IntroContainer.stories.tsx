import IntroContainer from "@/app/components/IntroContainer";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IntroContainer> = {
    component: IntroContainer,
};

export default meta;
type Story = StoryObj<typeof IntroContainer>;

export const Primary: Story = {
    args: {
        introAction: {
            link_type: "Web",
            url: "",
            text: "Learn More",
        },
        introDescription:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae",
        introHeader: "Our Mission: Excellence in Corrections",
        introImages: [
            {
                introImage: {
                    url: "https://placehold.co/800/EEE/x2",
                    alt: "Placeholder 1",
                    id: "",
                    dimensions: {
                        width: 800,
                        height: 800,
                    },
                    edit: {
                        x: 0,
                        y: 0,
                        zoom: 0,
                        background: "",
                    },
                    copyright: "",
                },
            },
            {
                introImage: {
                    url: "https://placehold.co/800/EEE/x2",
                    alt: "Placeholder 2",
                    id: "",
                    dimensions: {
                        width: 800,
                        height: 800,
                    },
                    edit: {
                        x: 0,
                        y: 0,
                        zoom: 0,
                        background: "",
                    },
                    copyright: "",
                },
            },
            {
                introImage: {
                    url: "https://placehold.co/800/EEE/x2",
                    alt: "Placeholder 3",
                    id: "",
                    dimensions: {
                        width: 800,
                        height: 800,
                    },
                    edit: {
                        x: 0,
                        y: 0,
                        zoom: 0,
                        background: "",
                    },
                    copyright: "",
                },
            },
            {
                introImage: {
                    url: "https://placehold.co/800/EEE/x2",
                    alt: "Placeholder 4",
                    id: "",
                    dimensions: {
                        width: 800,
                        height: 800,
                    },
                    edit: {
                        x: 0,
                        y: 0,
                        zoom: 0,
                        background: "",
                    },
                    copyright: "",
                },
            },
        ],
    },
};
