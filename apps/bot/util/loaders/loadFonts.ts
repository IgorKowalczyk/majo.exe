import { readDir } from "@majoexe/util/functions/files/readDir.js";
import { registerFont } from "canvas";
import type { Majobot } from "../..";

export default async function loadFonts(client: Majobot): Promise<void> {
 try {
  const loadTime = performance.now();
  const fonts = await readDir(`${process.cwd()}/util/images/fonts/`, true, [".ttf"]);

  for (const font of fonts) {
   const fontName = font.split("/").pop();

   if (fontName) {
    registerFont(font, { family: fontName.replace(".ttf", "") });
   } else {
    console.error("Invalid font path:", font);
   }
  }
  client.debugger("event", `Loaded ${fonts.length} fonts in ${client.performance(loadTime)}`);
 } catch (error) {
  client.debugger("error", `Error loading fonts: ${error}`);
 }
}
