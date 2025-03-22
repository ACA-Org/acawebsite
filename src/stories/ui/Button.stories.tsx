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

export const PrimaryOutline: Story = {
    args: {
        value: "Learn More",
        outlined: true,
    },
};

export const Secondary: Story = {
    args: {
        value: "Learn More",
        variant: "secondary",
    },
};

export const SecondaryOutline: Story = {
    args: {
        value: "Learn More",
        variant: "secondary",
        outlined: true,
    },
};

export const Tertiary: Story = {
    args: {
        value: "Learn More",
        variant: "tertiary",
    },
};

export const TertiaryOutline: Story = {
    args: {
        value: "Learn More",
        variant: "tertiary",
        outlined: true,
    },
};
