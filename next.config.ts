import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.us-west-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
