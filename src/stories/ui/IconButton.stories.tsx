import { ExpandingIconButton } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import { Settings } from "lucide-react";

const meta: Meta<typeof ExpandingIconButton> = {
    component: ExpandingIconButton,
    render: (args) => {
        return (
            <ExpandingIconButton {...args}>{args.value}</ExpandingIconButton>
        );
    },
};

export default meta;
type Story = StoryObj<typeof ExpandingIconButton>;

export const Primary: Story = {
    args: {
        label: "Learn More",
        icon: Settings,
    },
};
