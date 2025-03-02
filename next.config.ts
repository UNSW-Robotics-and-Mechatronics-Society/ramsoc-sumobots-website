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
    return [
      {
        source: "/",
        destination: `/2025`, // !! should match current year
        permanent: false, // Use false for temporary redirects (307) or true for permanent redirects (308)
      },
    ];
  },
};

export default nextConfig;
