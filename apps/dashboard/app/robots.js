import { dashboardConfig } from "@majoexe/config";

export default function robots() {
 return {
  rules: [
   {
    userAgent: "*",
   },
  ],
  sitemap: `${dashboardConfig.url}/sitemap.xml`,
  host: dashboardConfig.url,
 };
}
