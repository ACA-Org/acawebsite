import MenuItem from "@/slices/MenuItem";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MenuItem> = {
  component: MenuItem,
  render: (args) => (
    <div className="flex w-full justify-center">
      <MenuItem {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Primary: Story = {
  args: {
    version: "",
    items: [],
    slice_type: "menu_item",
    slice_label: null,
    id: "",
    variation: "default",
    primary: {
      featuredMenuImage: {
        url: "https://images.unsplash.com/photo-1591553161262-0eeddc1f5c23",
        id: "",
        copyright: "",
        dimensions: {
          height: 3168,
          width: 4752,
        },
        edit: {
          x: 0,
          y: 0,
          zoom: 1,
          background: "transparent",
        },
        alt: "tall",
      },
      featuredMenuLink: {
        link_type: "Web",
        url: "http://google.com",
        text: "About",
      },
      tierOneLink: {
        link_type: "Web",
        url: "http://google.com",
        text: "About",
      },
      tierTwoMenuItems: [
        {
          tierTwoMenuIcon: {
            url: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9",
            id: "",
            copyright: "",
            dimensions: {
              height: 3168,
              width: 4752,
            },
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
            alt: "tall",
          },
          tierTwoMenuDesc: "Section description",
          tierTwoMenuLink: {
            link_type: "Web",
            url: "http://twitter.com",
            text: "Our History & Mission",
          },
        },
        {
          tierTwoMenuIcon: {
            url: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9",
            id: "",
            copyright: "",
            dimensions: {
              height: 3168,
              width: 4752,
            },
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
            alt: "tall",
          },

          tierTwoMenuDesc: "Section description",

          tierTwoMenuLink: {
            link_type: "Web",
            url: "http://twitter.com",
            text: "Our Committees",
          },
        },
        {
          tierTwoMenuIcon: {
            url: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9",
            id: "",
            copyright: "",
            dimensions: {
              height: 3168,
              width: 4752,
            },
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
            alt: "tall",
          },

          tierTwoMenuDesc: "Section description",

          tierTwoMenuLink: {
            link_type: "Web",
            url: "http://twitter.com",
            text: "Executive Office",
          },
        },
        {
          tierTwoMenuIcon: {
            url: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9",
            id: "",
            copyright: "",
            dimensions: {
              height: 3168,
              width: 4752,
            },
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
            alt: "tall",
          },

          tierTwoMenuDesc: "Section description",

          tierTwoMenuLink: {
            link_type: "Web",
            url: "http://twitter.com",
            text: "ACA Awards",
          },
        },
        {
          tierTwoMenuIcon: {
            url: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9",
            id: "",
            copyright: "",
            dimensions: {
              height: 3168,
              width: 4752,
            },
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
            alt: "tall",
          },

          tierTwoMenuDesc: "Section description",

          tierTwoMenuLink: {
            link_type: "Web",
            url: "http://twitter.com",
            text: "ACA Leadership",
          },
        },
        {
          tierTwoMenuIcon: {
            url: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9",
            id: "",
            copyright: "",
            dimensions: {
              height: 3168,
              width: 4752,
            },
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
            alt: "tall",
          },

          tierTwoMenuDesc: "Section description",

          tierTwoMenuLink: {
            link_type: "Web",
            url: "http://twitter.com",
            text: "Organizational Docs",
          },
        },
      ],
    },
  },
};
