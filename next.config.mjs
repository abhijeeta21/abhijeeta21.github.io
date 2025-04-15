/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization for better performance
  images: {
    domains: ['localhost'],
    // Add other image domains if needed for your blog or other content
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

  // Use standalone output only in production
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

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

    // Don't modify devtool to avoid performance warnings
    // Don't use filesystem cache to avoid path resolution issues

    return config;
  },
};

export default nextConfig;