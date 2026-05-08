import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.0.4'],
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
