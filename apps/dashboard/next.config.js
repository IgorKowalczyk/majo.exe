const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
 enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
 reactStrictMode: true,
 pageExtensions: ["mdx", "md", "jsx", "js"],
 poweredByHeader: false,
 trailingSlash: false,
 compiler: {
  removeConsole: process.env.NODE_ENV === "production",
 },
 images: {
  domains: [
   "github.githubassets.com", // GitHub assets
   "cdn.discordapp.com", // Discord
   "media.discordapp.net", // Discord
  ],
 },
 webpack: (config, { isServer }) => {
  if (isServer) {
   config.plugins = [...config.plugins, new PrismaPlugin()];
  } else {
   config.resolve = {
    ...config.resolve,
    fallback: {
     net: false,
     dns: false,
     tls: false,
     assert: false,
    },
   };
  }

  return config;
 },
 async redirects() {
  return [
   {
    source: "/discord",
    destination: "https://discord.gg/uxtSMtd2xZ",
    permanent: true,
   },
   {
    source: "/invite",
    destination: `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=1916267615&scope=guilds%20identify%20bot%20applications.commands&&redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL)}&response_type=code`,
    permanent: true,
   },
  ];
 },
 async headers() {
  return [
   {
    source: "/(.*)",
    headers: [
     {
      key: "Referrer-Policy",
      value: "no-referrer",
     },
     {
      key: "X-Content-Type-Options",
      value: "nosniff",
     },
     {
      key: "X-DNS-Prefetch-Control",
      value: "on",
     },
     {
      key: "Strict-Transport-Security",
      value: "max-age=31536000; includeSubDomains; preload",
     },
     {
      key: "X-XSS-Protection",
      value: "1; mode=block",
     },
     {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=()",
     },
    ],
   },
  ];
 },
};

module.exports = () => {
 const plugins = [withBundleAnalyzer];
 const config = plugins.reduce((acc, next) => next(acc), {
  ...nextConfig,
 });
 return config;
};
