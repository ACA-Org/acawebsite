import type { Meta, StoryObj } from "@storybook/react";
import img from "./denver.png";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";

const meta: Meta<typeof Card> = {
    component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
    render: () => {
        return (
            <Card
                className="w-[425px] h-[550px] bg-no-repeat bg-center bg-cover"
                style={{
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.75) 100%), url(${img.src}) lightgray 50% / cover no-repeat`,
                    boxShadow: `0px 4px 48px 0px rgba(0, 0, 0, 0.12)`,
                }}
            >
                <CardHeader className="w-full uppercase pb-4">
                    <p className="text-base font-medium">Denver, CO</p>
                    <p className="text-base font-medium">Aug 21-26, 2025</p>
                </CardHeader>
                <CardTitle>
                    <h3>155th Congress of Correction</h3>
                </CardTitle>
                <CardDescription>
                    <p>Lorem ipsum dolor sit amet</p>
                </CardDescription>
            </Card>
        );
    },
};
