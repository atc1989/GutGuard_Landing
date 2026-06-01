import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gutguard.ph",
      },
    ],
  },
};

export default nextConfig;
