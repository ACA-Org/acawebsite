import Accordion from "@/slices/Accordion";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  args: {
    slice: {
      variation: "default",
      version: "",
      items: [],
      slice_type: "accordion",
      id: "123",
      slice_label: null,
      primary: {
        accordionHeading: "This is for an optional heading above the Accordion",
        accordionContent:
          "This is for some optional description text below the Accordion Heading",
        accordionItems: [
          {
            accordionAction: {
              link_type: "Web",
              url: "",
            },
            accordionDescription: [
              {
                type: "paragraph",
                text: "Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet...",
                spans: [],
              },
            ],
            accordionTitle: "Accordion Title",
          },
          {
            accordionAction: {
              link_type: "Web",
              url: "",
            },
            accordionDescription: [
              {
                type: "paragraph",
                text: "Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet...",
                spans: [],
              },
            ],
            accordionTitle: "Accordion Title",
          },
          {
            accordionAction: {
              link_type: "Web",
              url: "",
            },
            accordionDescription: [
              {
                type: "paragraph",
                text: "Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet...",
                spans: [],
              },
            ],
            accordionTitle: "Accordion Title",
          },
          {
            accordionAction: {
              link_type: "Web",
              url: "",
            },
            accordionDescription: [
              {
                type: "paragraph",
                text: "Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet...",
                spans: [],
              },
            ],
            accordionTitle: "Accordion Title",
          },
        ],
      },
    },
  },
};
