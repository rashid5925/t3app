/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/documentation/devs/56/l/top.json',
            destination: 'https://meta.discourse.org/c/documentation/devs/56/l/top.json?ascending=false&page=1&per_page=8' // Proxy to Backend
          }
        ]
      }
};

export default nextConfig;
