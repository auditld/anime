import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["otakudesu.best", "192.168.*", "*.local"],
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
