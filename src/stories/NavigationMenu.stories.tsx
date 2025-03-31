import { NavigationMenu } from "@/components/header/components/NavigationMenu";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NavigationMenu> = {
  component: NavigationMenu,
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Primary: Story = {
  args: {
    slices: [
      {
        variation: "default",
        version: "initial",
        items: [],
        primary: {
          tierOneLink: {
            link_type: "Web",
            url: "/about",
            text: "About",
          },
          tierTwoMenuItems: [
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: "Section description",
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Our History & Mission",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: "Section description",
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Executive Office",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: "Section description",
              tierTwoMenuLink: {
                link_type: "Any",
                text: "ACA Leadership",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: "Section description",
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Our Committees",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "ACA Awards",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Organizational Docs",
              },
            },
          ],
          featuredMenuImage: {
            dimensions: {
              width: 5688,
              height: 3792,
            },
            alt: "orange fruits under blue sky during daytime",
            copyright: null,
            url: "https://images.unsplash.com/photo-1597714026720-8f74c62310ba?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwxMHx8Y2l0cnVzJTIwZnJ1aXR8ZW58MHx8fHwxNzQyNTExMDMyfDA&ixlib=rb-4.0.3&q=85",
            id: "eaOjEz8746k",
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
          },
          featuredMenuLink: {
            link_type: "Any",
            text: "Orange",
          },
        },
        id: "menu_item$5200818b-6816-480e-af36-31b105f7c4b6",
        slice_type: "menu_item",
        slice_label: null,
      },
      {
        variation: "default",
        version: "initial",
        items: [],
        primary: {
          tierOneLink: {
            link_type: "Any",
            text: "Departments",
          },
          tierTwoMenuItems: [
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: "Section description",
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Global Corrections Service",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: "Section description",
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Correctional Healthcare",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: "Section description",
              tierTwoMenuLink: {
                link_type: "Web",
                url: "/departments/professional_development",
                text: "Professional Development",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: "Section description",
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Membership",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Publications",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Sales & Marketing",
              },
            },
          ],
          featuredMenuImage: {
            dimensions: {
              width: 4380,
              height: 2901,
            },
            alt: "orange fruit in water with water",
            copyright: null,
            url: "https://images.unsplash.com/photo-1582789760972-c8916cebe649?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwxOHx8Y2l0cnVzJTIwZnJ1aXR8ZW58MHx8fHwxNzQyNTExMDMyfDA&ixlib=rb-4.0.3&q=85",
            id: "uYM_PQJ8VvY",
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
          },
          featuredMenuLink: {
            link_type: "Any",
            text: "Splash",
          },
        },
        id: "menu_item$3f8c57f9-dcbd-4fe1-8090-a036bd898970",
        slice_type: "menu_item",
        slice_label: null,
      },
      {
        variation: "default",
        version: "initial",
        items: [],
        primary: {
          tierOneLink: {
            link_type: "Any",
            text: "Conferences",
          },
          tierTwoMenuItems: [
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: "Section description",
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Current Conference",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: "Section description",
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Future Conferences",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: "Section description",
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Workshops/Trainings",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Advertising Opportunities",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Program Book Archive",
              },
            },
          ],
          featuredMenuImage: {
            dimensions: {
              width: 6720,
              height: 4480,
            },
            alt: "people in conference",
            copyright: null,
            url: "https://images.unsplash.com/photo-1561489396-888724a1543d?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwyfHxjb25mZXJlbmNlfGVufDB8fHx8MTc0MjU1OTkzMXww&ixlib=rb-4.0.3&q=85",
            id: "nwLTVwb7DbU",
            edit: {
              x: 0,
              y: 0,
              zoom: 1,
              background: "transparent",
            },
          },
          featuredMenuLink: {
            link_type: "Any",
            text: "Next Conference",
          },
        },
        id: "menu_item$5253f68b-20b4-4314-af17-9d812eb9095c",
        slice_type: "menu_item",
        slice_label: null,
      },
      {
        variation: "default",
        version: "initial",
        items: [],
        primary: {
          tierOneLink: {
            link_type: "Any",
            text: "Standards & Accreditations",
          },
          tierTwoMenuItems: [
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "About Us",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Standards & Committees",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Seeking Accredidation",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Manual of Accreditation Policy and Procedure",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Prison Rape Elimination Act (PREA)",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Auditors",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Accredited Facilities",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Awards",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "FAQs",
              },
            },
          ],
          featuredMenuImage: {},
          featuredMenuLink: {
            link_type: "Any",
          },
        },
        id: "menu_item$a2a44be8-c7bc-49ce-aa4c-e22c44843689",
        slice_type: "menu_item",
        slice_label: null,
      },
      {
        variation: "default",
        version: "initial",
        items: [],
        primary: {
          tierOneLink: {
            link_type: "Any",
            text: "Resources",
          },
          tierTwoMenuItems: [
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Healthcare Resource Center",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Videos & Media",
              },
            },
            {
              tierTwoMenuIcon: {},
              tierTwoMenuDesc: null,
              tierTwoMenuLink: {
                link_type: "Any",
                text: "Legislative Affairs Resources",
              },
            },
          ],
          featuredMenuImage: {},
          featuredMenuLink: {
            link_type: "Any",
          },
        },
        id: "menu_item$97509193-a961-444f-9eef-52218d305385",
        slice_type: "menu_item",
        slice_label: null,
      },
    ],
  },
};
