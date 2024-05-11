/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/c/documentation/devs/56/l/:path*',
            destination: 'https://meta.discourse.org/c/documentation/devs/56/l/:path*' // Proxy to Backend
          }
        ]
      }
};

export default nextConfig;
