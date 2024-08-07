import { dashboardConfig } from "@majoexe/config";

export default function sitemap() {
 const routes = ["", "/commands", "/legal/privacy-policy", "/legal/terms-of-service"].map((route) => ({
  url: `${dashboardConfig.url}${route}`,
  lastModified: new Date().toISOString().split("T")[0],
 }));

 return [...routes];
}
