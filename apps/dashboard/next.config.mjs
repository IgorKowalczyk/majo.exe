import { dashboardHeaders, dashboardRedirects } from "@majoexe/config";
import createMdx from "@next/mdx";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

const withMDX = createMdx();

const nextConfig = {
 reactStrictMode: true,
 pageExtensions: ["mdx", "jsx", "js"],
 poweredByHeader: false,
 trailingSlash: false,
 compiler: {
  removeConsole: {
   exclude: ["error, warn"],
  },
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
  return dashboardRedirects;
 },
 async headers() {
  return dashboardHeaders;
 },
};

export default withMDX(nextConfig);
