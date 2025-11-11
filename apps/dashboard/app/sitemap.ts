import { dashboardConfig } from "@majoexe/config";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/commands", "/legal/privacy-policy", "/legal/terms-of-service"].map((route) => ({
    url: `${dashboardConfig.url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
