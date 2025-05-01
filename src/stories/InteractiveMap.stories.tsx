import Map from "@/components/interactive-map";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Map> = {
  component: Map,
};

export default meta;
type Story = StoryObj<typeof Map>;

export const Primary: Story = {
  args: {
    locations: [
      {
        id: "1",
        name: "Location 1",
        latitude: 28.092779,
        longitude: -81.723068,
      },
    ],
  },
};
