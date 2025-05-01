import SocialCarousel from "@/slices/SocialCarousel";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SocialCarousel> = {
  component: SocialCarousel,
  render: (args) => {
    return (
      <div className="max-h-[624px] w-full">
        <SocialCarousel {...args} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof SocialCarousel>;

export const Primary: Story = {
  args: {
    slice: {
      variation: "default",
      version: "",
      items: [],
      slice_type: "social_carousel",
      id: "123",
      slice_label: null,
      primary: {
        socialCarouselTitle: "Join the Discussion",
        socialCarouselLink: {
          link_type: "Web",
          url: "https://google.com",
          text: "Learn More",
        },
        socialCarouselDescription:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae",
      },
    },
  },
};
