import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Dangerously allow production builds to successfully complete 
    // even if your project has TypeScript type mismatches.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Production build ko linting errors par bhi rukne se bachata hai
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;