import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        hostname: "d2v5dzhdg4zhx3.cloudfront.net",
        protocol: "https",
      },
      {
        hostname: "localhost",
        protocol: "http",
        port: "8080",
        pathname: "/api/v1/images/image/download/**",
      },
      {
        hostname: "api.omise.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
