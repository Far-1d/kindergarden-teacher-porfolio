import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint:{
    ignoreDuringBuilds: true,
  },
  // compiler: {
  //   removeConsole: true,
  // },
  experimental:{
    cpus: 1
  }
};


export default nextConfig;
