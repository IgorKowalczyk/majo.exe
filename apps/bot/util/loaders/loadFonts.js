import { GlobalFonts } from "@napi-rs/canvas";
import { globby } from "globby";

export default async function loadFonts(client) {
 const loadTime = performance.now();
 const fonts = await globby(`${process.cwd()}/util/images/fonts/*.ttf`);
 for (const font of fonts) {
  GlobalFonts.registerFromPath(font, font.split("/").pop().replace(".ttf", ""));
 }
 client.debugger("event", `Loaded ${fonts.length} fonts in ${client.performance(loadTime)}`);
}
