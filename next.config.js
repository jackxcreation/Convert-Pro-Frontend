// next.config.js
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // don't use experimental.appDir — Next 14 handles the app dir automatically
  // add a webpack alias so "@/..." imports resolve during build
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname),
      "@components": path.resolve(__dirname, "components"),
    };
    return config;
  },
};

module.exports = nextConfig;
