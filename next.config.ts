import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['assets.aceternity.com'], // Add your image host here
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    return config;
  },
};

export default nextConfig;
