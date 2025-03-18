import Accordion from "@/slices/Accordion";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Accordion> = {
    component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
    args: {
        slice: {
            variation: "default",
            version: "",
            items: [],
            slice_type: "accordion",
            id: "123",
            slice_label: null,
            primary: {
                accordionItems: [
                    {
                        accordionAction: {
                            link_type: "Web",
                            url: "",
                        },
                        accordionDescription:
                            "Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
                        accordionTitle: "Accordion Title",
                    },
                    {
                        accordionAction: {
                            link_type: "Web",
                            url: "",
                        },
                        accordionDescription:
                            "Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
                        accordionTitle: "Accordion Title",
                    },
                    {
                        accordionAction: {
                            link_type: "Web",
                            url: "",
                        },
                        accordionDescription:
                            "Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
                        accordionTitle: "Accordion Title",
                    },
                    {
                        accordionAction: {
                            link_type: "Web",
                            url: "",
                        },
                        accordionDescription:
                            "Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
                        accordionTitle: "Accordion Title",
                    },
                ],
            },
        },
    },
};
