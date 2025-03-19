import { Input } from "@/components/ui/input";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
    component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
    args: {
        placeholder: "Enter your name...",
        className: "w-[300px]",
    },
};
