/** @type {import('next').NextConfig} */


const existingEnvVars = Object.keys(process.env);

// Load the environment variables only if they are not already defined
require("dotenv-flow").config({
  node_env: process.env.APP_ENV || "mainnet",
  silent: existingEnvVars.length > 0,
});

const env = {};

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        stream: false,
        crypto: false,
        path: false,
        dgram: false,
      };
    }
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };

    return config;
  },
  env,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

module.exports = nextConfig;
