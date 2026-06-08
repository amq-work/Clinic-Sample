import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Clinic-Sample",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
