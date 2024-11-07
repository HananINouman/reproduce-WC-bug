/** @type {import('next').NextConfig} */


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
