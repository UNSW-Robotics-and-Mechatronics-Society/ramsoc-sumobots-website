import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.68.105"],
  experimental: {
    serverActions: {
      // Images are uploaded as FormData through a server action; the default
      // 1MB cap rejects full-size photos. Allow up to 10MB.
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: `/2026`, // !! should match current year
        permanent: false, // Use false for temporary redirects (307) or true for permanent redirects (308)
      },
    ];
  },
};

export default nextConfig;
