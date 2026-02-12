import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["otakudesu.best"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
