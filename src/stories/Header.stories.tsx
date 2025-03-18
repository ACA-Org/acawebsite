import Header from "@/components/header";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
    args: {
        scrollY: {
            type: "number",
        },
    },
    component: Header,
    parameters: {
        layout: "fullscreen",
    },
    render: () => {
        return (
            <>
                <Header />
                <main className="h-full w-full pt-32 px-16">
                    <div className="p-5">
                        {[...Array(20)].map((_, index) => (
                            <div
                                key={index}
                                className="mb-16 p-4 bg-[#F9F9F9] rounded-xl shadow-lg"
                            >
                                <h2 className="text-xl font-semibold mb-2">
                                    Sample Section {index + 1}
                                </h2>
                                <p className="text-gray-600">
                                    This is some sample content to enable
                                    scrolling. As you scroll down, you&apos;ll
                                    notice the header transitions to its compact
                                    state.
                                </p>
                            </div>
                        ))}
                    </div>
                </main>
            </>
        );
    },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
