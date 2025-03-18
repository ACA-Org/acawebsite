import type { Preview } from "@storybook/react";
import * as React from "react";
import "../src/app/globals.css";

export const breakpoints = {
    xs: "22.5em",
    sm: "30em",
    md: "48em",
    lg: "64em",
    xl: "90em",
};

const customViewports = {
    xs: {
        name: "xs",
        styles: {
            width: breakpoints.xs,
            height: "601px",
        },
    },
    sm: {
        name: "sm",
        styles: {
            width: breakpoints.sm,
            height: "601px",
        },
    },
    md: {
        name: "md",
        styles: {
            width: breakpoints.md,
            height: "801px",
        },
    },
    lg: {
        name: "lg",
        styles: {
            width: breakpoints.lg,
            height: "801px",
        },
    },
    xl: {
        name: "xl",
        styles: {
            width: breakpoints.xl,
            height: "801px",
        },
    },
};
const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        viewport: {
            viewports: customViewports,
        },
    },
    decorators: [
        (Story) => (
            <div className="flex h-full w-full items-center justify-center overflow-clip">
                <Story />
            </div>
        ),
    ],
};

export default preview;
