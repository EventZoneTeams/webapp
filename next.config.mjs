/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    swcPlugins: [["glass-js/swc", {}]],
  },
};

export default nextConfig;
