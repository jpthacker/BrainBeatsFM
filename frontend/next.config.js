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

// http://localhost:3000/rooms/%22https:/brainbeatsfm.s3.eu-west-1.amazonaws.com/folk-pop-sample.mp3%22
