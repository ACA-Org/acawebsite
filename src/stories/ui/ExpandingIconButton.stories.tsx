import { ExpandingIcon } from "@/components/header/components/ExpandingIcon";
import { Meta, StoryObj } from "@storybook/react";
import { Plus } from "lucide-react";

const meta: Meta<typeof ExpandingIcon> = {
    component: ExpandingIcon,
    args: {
        icon: Plus,
        label: "Expand",
    },
};

export default meta;

export const Default: StoryObj<typeof ExpandingIcon> = {};
