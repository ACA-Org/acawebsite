import SpeedBump from "@/slices/SpeedBump";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SpeedBump> = {
    component: SpeedBump,
};

export default meta;
type Story = StoryObj<typeof SpeedBump>;

export const Primary: Story = {
    args: {
        slice: {
            variation: "default",
            version: "",
            items: [],
            slice_type: "side_by_side",
            id: "123",
            slice_label: null,
            primary: {
                speedbumptitle: "Connect, Learn, and Lead",
                speedbumpimage: {
                    alt: "Placeholder",
                    url: "https://placehold.co/600x400/EEE/31343C?font=poppins&text=Poppins",
                    id: "",
                    dimensions: {
                        width: 600,
                        height: 400,
                    },
                    edit: {
                        x: 0,
                        y: 0,
                        zoom: 0,
                        background: "",
                    },
                    copyright: "",
                },
                speedbumplink: {
                    link_type: "Web",
                    text: "Learn More",
                    url: "https://google.com",
                    target: "_blank",
                },
                speedbumpdescription:
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae",
            },
        },
    },
};
