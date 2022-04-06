/**
 * @type {import('next').NextConfig}
 */

const contentSecurityPolicy = `
 default-src 'self'; 
 font-src 'self' data: fonts.gstatic.com;
 img-src * 'self' data:;
 style-src 'self' 'unsafe-inline' fonts.googleapis.com; 
 script-src 'self' 'unsafe-eval';
 connect-src * 'self' data:;
 `;
const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  async redirects() {
    return [
      {
        source: "/staking",
        destination: "/governance",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)?", // Matches all pages
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: new Date().toString(),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
