import LinkCard from "@/slices/LinkCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof LinkCard> = {
  component: LinkCard,
  render: (args) => (
    <div className="flex w-full justify-center">
      <LinkCard {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof LinkCard>;

export const Primary: Story = {
  args: {
    slice: {
      version: "",
      items: [],
      slice_type: "link_card",
      slice_label: null,
      id: "",
      variation: "default",
      primary: {
        cardDescription:
          "Lorem ipsum dolor sit amet ipsa quae ab illo inventore veritatis",
        cardTitle: "E-Learning",
        cardLink: {
          link_type: "Web",
          url: "http://google.com",
          text: "Learn More",
        },
      },
    },
  },
};
