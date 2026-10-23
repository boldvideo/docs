import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // The Zoom App Marketplace listing and older links point at the pre-2025
  // docs path.
  async redirects() {
    return [
      {
        source: "/docs/Guides/zoom",
        destination: "/guides/zoom",
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
