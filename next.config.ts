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
        hostname: "s3-us-west-1.amazonaws.com",
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
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // cacheMaxMemorySize: 4 * 1024 * 1024, // 4MB

  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },

  // experimental: {
  //   staleTimes: {
  //     dynamic: 30,
  //     static: 180,
  //   },
  // },
};

export default nextConfig;
