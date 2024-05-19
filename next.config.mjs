/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/c/documentation/devs/56/l/:path*",
        destination:
          "https://meta.discourse.org/c/documentation/devs/56/l/:path*", // Proxy to Backend
      },
      {
        source: "/t/:path*",
        destination: "https://meta.discourse.org/t/:path*", // Proxy to Backend
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["shiki"],
  },
};

export default nextConfig;
