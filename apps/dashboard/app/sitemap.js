import { meta } from "@config";

export default async function sitemap() {
 const routes = ["", "/commands", "/auth/login"].map((route) => ({
  url: `${meta.url}${route}`,
  lastModified: new Date().toISOString().split("T")[0],
 }));

 return [...routes];
}
