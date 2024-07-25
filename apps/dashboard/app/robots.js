import { dashboardConfig } from "@nyxia/config";

export default function robots() {
 return {
  rules: [
   {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/", "/dashboard/", "/auth/", "/cgi-bin/", "/server/", "/user/"],
   },
  ],
  sitemap: `${dashboardConfig.url}/sitemap.xml`,
  host: dashboardConfig.url,
 };
}
