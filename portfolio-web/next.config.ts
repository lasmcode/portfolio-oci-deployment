import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone',
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'objectstorage.us-ashburn-1.oraclecloud.com',
        port: '',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;