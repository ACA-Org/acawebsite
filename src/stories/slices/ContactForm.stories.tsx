import ContactForm from "@/slices/ContactForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ContactForm> = {
  component: ContactForm,
  render: () => (
    <div className="w-full flex justify-center">
      <ContactForm />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof ContactForm>;

export const Primary: Story = {
  args: {},
};
