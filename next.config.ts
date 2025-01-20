import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/v1/:path*/',
        destination: process.env.NEXT_PUBLIC_SERVER_URL + '/:path*',
      },
      {
        source: '/api/v1/:path*',
        destination: process.env.NEXT_PUBLIC_SERVER_URL + '/:path*',
      }
    ];
  },
};

export default nextConfig;
