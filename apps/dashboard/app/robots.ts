import { dashboardConfig } from "@majoexe/config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
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
