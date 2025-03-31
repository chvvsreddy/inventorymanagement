import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol:"https",
        hostname: "https://inventorymanangement-s3.s3.ap-south-1.amazonaws.com",
        port:"",
        pathname:"/**"
      }
    ]
  }
};

export default nextConfig;
