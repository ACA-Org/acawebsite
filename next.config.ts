import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // logging: {
  // fetches: {
  // fullUrl: true,
  // },
  // },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://aca.org",
        "https://www.aca.org",
        "www.aca.org",
        "aca.org",
      ],
    },
  },
};

export default nextConfig;
