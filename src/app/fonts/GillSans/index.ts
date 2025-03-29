import localFont from "next/font/local";

export const gillSans = localFont({
  variable: "--font-gill-sans",
  src: [
    {
      path: "./gs.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./gs-it.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./gs-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./gs-light-it.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./gs-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./gs-medium-it.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./gs-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./gs-bold-it.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./gs-heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./gs-heavy-it.otf",
      weight: "800",
      style: "italic",
    },
    // {
    //     path: "./gs-cond.otf",
    //     weight: "400",
    //     style: "normal",
    // },
    // {
    //     path: "./gs-cond-bold.otf",
    //     weight: "700",
    //     style: "normal",
    // },
  ],
});

// const names = [
//     "gs-bold-it.otf ",
//     "gs-bold.otf ",
//     "gs-cond-bold.otf ",
//     "gs-cond.otf ",
//     "gs-heavy-it.otf ",
//     "gs-heavy.otf ",
//     "gs-it.otf ",
//     "gs-light-it.otf ",
//     "gs-light.otf ",
//     "gs-medium-it.otf ",
//     "gs-medium.otf ",
//     "gs.otf",
// ];
