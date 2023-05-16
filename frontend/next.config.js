/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:route*",
        destination: "http://localhost:8080/:route*",
      },
    ];
  },
};

module.exports = nextConfig;
