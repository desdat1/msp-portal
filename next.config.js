/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Ensure API routes are included
  experimental: {
    serverComponentsExternalPackages: []
  },
  
  // Make sure all files are included in build
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ensure API routes are properly included
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig