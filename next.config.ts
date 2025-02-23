import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
  async redirects() {
    const currentYear = new Date().getFullYear();
    return [
      {
        source: "/sumobots",
        destination: `/sumobots/${currentYear}`,
        permanent: false, // Use false for temporary redirects (307) or true for permanent redirects (308)
      },
    ];
  },
};

export default nextConfig;
