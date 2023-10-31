const withBundleAnalyzer = require("@next/bundle-analyzer")({
 enabled: process.env.ANALYZE === "true",
});
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

const nextConfig = {
 reactStrictMode: true,
 pageExtensions: ["mdx", "md", "jsx", "js"],
 poweredByHeader: false,
 trailingSlash: false,
 compiler: {
  removeConsole: process.env.NODE_ENV === "production",
 },
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "cdn.discordapp.com",
    pathname: "**",
   },
   {
    protocol: "https",
    port: "",
    hostname: "media.discordapp.net",
    pathname: "**",
   },
  ],
 },
 webpack: (config, { isServer }) => {
  config.externals.push({
   "utf-8-validate": "commonjs utf-8-validate",
   bufferutil: "commonjs bufferutil",
  });
  if (isServer) {
   config.plugins = [...config.plugins, new PrismaPlugin()];
  }
  return config;
 },
 async redirects() {
  return [
   {
    source: "/discord",
    destination: "https://discord.gg/sgt4QEyDxK",
    permanent: true,
   },
   {
    source: "/server",
    destination: "https://discord.gg/sgt4QEyDxK",
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
