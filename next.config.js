/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['cheerio'],
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    return config;
  },
};

module.exports = nextConfig;
