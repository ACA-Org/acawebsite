import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "@/components/breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const SingleLevel: Story = {
  args: {
    path: "/about",
  },
};

export const TwoLevels: Story = {
  args: {
    path: "/about/team",
  },
};

export const ThreeLevels: Story = {
  args: {
    path: "/products/electronics/phones",
  },
};

export const LongPath: Story = {
  args: {
    path: "/shop/categories/electronics/smartphones/iphone/models",
  },
};

export const WithTrailingSlash: Story = {
  args: {
    path: "/about/contact/",
  },
};
