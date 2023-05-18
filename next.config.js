/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/UI",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
