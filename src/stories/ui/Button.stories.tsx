import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
    component: Button,
    render: (args) => {
        return <Button {...args}>{args.value}</Button>;
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        value: "Learn More",
    },
};

export const Secondary: Story = {
    args: {
        value: "Learn More",
        variant: "secondary",
    },
};

export const Tertiary: Story = {
    args: {
        value: "Learn More",
        variant: "tertiary",
    },
};

export const Error: Story = {
    args: {
        value: "Learn More",
        variant: "error",
    },
};
