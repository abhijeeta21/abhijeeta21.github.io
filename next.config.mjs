/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Already set correctly for static export
  // No basePath needed for username.github.io sites
  basePath: '',
  trailingSlash: true, // Good for static hosting
  images: {
    unoptimized: true, // Required for static exports
    domains: ['localhost'],
  },
};

export default nextConfig;