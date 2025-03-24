import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      "res.cloudinary.com",
      "cdn.pixabay.com",
      "assets.aceternity.com",
      "images.unsplash.com",
      "randomuser.me",
    ].map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

export default nextConfig;
