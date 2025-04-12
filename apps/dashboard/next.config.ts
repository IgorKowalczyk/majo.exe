import { dashboardHeaders, dashboardRedirects } from "@majoexe/config";
import createMdx from "@next/mdx";
import type { NextConfig } from "next";
import "@/env";

const withMDX = createMdx();

const nextConfig = {
 reactStrictMode: true,
 pageExtensions: ["mdx", "jsx", "js", "ts", "tsx"],
 poweredByHeader: false,
 trailingSlash: false,
 experimental: {
  // ppr: true,
  // reactCompiler: {
  //  compilationMode: "annotation",
  // },
 },
 eslint: {
  ignoreDuringBuilds: true,
 },
 typescript: {
  ignoreBuildErrors: true,
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
   config.plugins = [...config.plugins];
  }
  return config;
 },
 async redirects() {
  return dashboardRedirects;
 },
 async headers() {
  return dashboardHeaders;
 },
} satisfies NextConfig;

export default withMDX(nextConfig);
