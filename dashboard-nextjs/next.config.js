// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: 'https://api.management.parse25proje.link/:path*',
        },
      ];
    },
  };
  