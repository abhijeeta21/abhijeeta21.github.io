/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization for better performance
  images: {
    domains: ['localhost'],
    // Add GitHub Pages domain to allowed domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.github.io',
      },
    ],
    // Make images work properly with static exports
    unoptimized: process.env.NODE_ENV === 'production',
  },
  
  // Only enable strict mode in production for faster development experience
  reactStrictMode: process.env.NODE_ENV === 'production',
  
  // For faster page loads
  experimental: {
    // Scroll restoration for smoother navigation experience
    scrollRestoration: true,
    // Enable these optimizations for faster development compilation
    optimizeCss: true,
    optimizePackageImports: ['react-dom', 'react'],
  },

  // Set the base path for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_PATH || '' : '',
  
  // Set assetPrefix for GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_PATH || '' : '',
  
  // Use static output for GitHub Pages compatibility
  output: 'export',

  // Webpack optimizations
  webpack(config, { dev, isServer }) {
    // Only enable bundleAnalyzer when ANALYZE env variable is set
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      );
    }

    return config;
  },
};

export default nextConfig;