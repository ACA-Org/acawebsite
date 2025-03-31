import { RightMenu } from "@/components/right-menu";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RightMenu> = {
  component: RightMenu,
};

export default meta;
type Story = StoryObj<typeof RightMenu>;

export const Primary: Story = {
  args: {
    items: [
      {
        href: "",
        label: "Tier Two Page",
      },
      {
        href: "",
        label: "Tier Two Page",
      },
      {
        href: "",
        label: "Tier Two Page",
      },
      {
        href: "",
        label: "Tier Two Page",
        children: [
          {
            href: "",
            label: "Tier Three Page",
          },
          {
            href: "",
            label: "Tier Three Page",
          },
          {
            href: "",
            label: "Tier Three Page",
          },
        ],
      },
    ],
  },
};
