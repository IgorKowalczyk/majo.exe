import { dashboardConfig } from "@majoexe/config";

export default async function sitemap() {
 const routes = ["", "/commands", "/auth/login"].map((route) => ({
  url: `${dashboardConfig.url}${route}`,
  lastModified: new Date().toISOString().split("T")[0],
 }));

 return [...routes];
}
