import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.0.4'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/notes',
        destination: '/notes/filter/all',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
