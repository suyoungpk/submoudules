/** @type {import('next').NextConfig} */
const Dotenv = require("dotenv-webpack");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    config.plugins.push(new Dotenv({ silent: true }));

    return config;
  },
};

module.exports = nextConfig;
