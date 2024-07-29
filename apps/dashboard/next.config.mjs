import { dashboardHeaders, dashboardRedirects } from "@majoexe/config";
import withBundleAnalyzer from "@next/bundle-analyzer";
import createMdx from "@next/mdx";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

const withMDX = createMdx();
const withBundle = withBundleAnalyzer({
 enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
 reactStrictMode: true,
 pageExtensions: ["mdx", "jsx", "js"],
 poweredByHeader: false,
 trailingSlash: false,
 experimental: {
  // ppr: true,
  // reactCompiler: {
  //  compilationMode: "annotation",
  // },
 },
 images: {
  unoptimized: true,
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
 redirects() {
  return dashboardRedirects;
 },
 headers() {
  return dashboardHeaders;
 },
};

export default withMDX(withBundle(nextConfig));
