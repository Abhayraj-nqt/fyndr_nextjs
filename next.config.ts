import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
  // eslint: { ignoreDuringBuilds: true },
  // typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s3.us-west-1.amazonaws.com", port: "" },
      { protocol: "https", hostname: "s3-us-west-1.amazonaws.com", port: "" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", port: "" },
      { protocol: "https", hostname: "png.pngtree.com", port: "" },
      { protocol: "https", hostname: "github.com", port: "" },
    ],
  },
  logging: { fetches: { fullUrl: true } },
};

export default nextConfig;
