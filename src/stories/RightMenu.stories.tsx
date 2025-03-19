import { RightMenu } from "@/components/right-menu";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RightMenu> = {
    component: RightMenu,
};

export default meta;
type Story = StoryObj<typeof RightMenu>;

export const Primary: Story = {
    args: {
        data: {
            id: "Z9ofYxEAACsA3fS3",
            uid: "this-is-a-test",
            url: null,
            type: "rightMenu",
            href: "https://acawebsite.cdn.prismic.io/api/v2/documents/search?ref=Z9okmBEAACkA3fzp&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22Z9ofYxEAACsA3fS3%22%29+%5D%5D",
            tags: [],
            first_publication_date: "2025-03-19T01:35:33+0000",
            last_publication_date: "2025-03-19T01:57:44+0000",
            slugs: ["tier-2-page"],
            linked_documents: [],
            lang: "en-us",
            alternate_languages: [],
            data: {
                rightMenuHeader: "About",
                slices: [
                    {
                        variation: "default",
                        version: "initial",
                        items: [],
                        primary: {
                            rightMenuLinks: [
                                {
                                    link_type: "Any",
                                    key: "c8acd94c-f679-4a33-ba4c-5abc2d61b476",
                                    text: "Tier 2 Page",
                                },
                                {
                                    link_type: "Any",
                                    key: "f07beef9-2cda-4cc4-b210-2a5c5d0b689a",
                                    text: "Tier 2 Page",
                                },
                            ],
                        },
                        id: "right_menu_link$ea80c7af-c402-4cd4-852c-5d07ffb9c5d3",
                        slice_type: "right_menu_link",
                        slice_label: null,
                    },
                    {
                        variation: "default",
                        version: "initial",
                        items: [],
                        primary: {
                            accordionItems: [
                                {
                                    accordionLabel: "Tier 2 Page",
                                    accordionLinks: [
                                        {
                                            link_type: "Any",
                                            key: "14114514-8009-4b30-8e38-2cfbecdcfc7f",
                                            text: "Overview",
                                        },
                                        {
                                            link_type: "Any",
                                            key: "d3e8198a-17d4-4fe1-8d19-5003251ab229",
                                            text: "Tier 3 Page",
                                        },
                                        {
                                            link_type: "Any",
                                            key: "041886e6-6737-43ce-b1ee-1fb0f329f6f6",
                                            text: "Tier 3 Page",
                                        },
                                    ],
                                },
                            ],
                        },
                        id: "right_menu$fd02af12-a050-44bf-adf8-0c1d036953dd",
                        slice_type: "right_menu",
                        slice_label: null,
                    },
                    {
                        variation: "default",
                        version: "initial",
                        items: [],
                        primary: {
                            rightMenuLinks: [
                                {
                                    link_type: "Any",
                                    key: "ca449813-c188-4845-bd54-fb463e5b2fd3",
                                    text: "Tier 2 Page",
                                },
                                {
                                    link_type: "Any",
                                    key: "c9b5c91f-5258-4017-97e5-2435052201fb",
                                    text: "Tier 2 Page",
                                },
                            ],
                        },
                        id: "right_menu_link$de96a1d1-9cbd-4ebd-9e42-8de4ed7c17fe",
                        slice_type: "right_menu_link",
                        slice_label: null,
                    },
                ],
            },
        },
    },
};
