import { readDir } from "@majoexe/util/functions/files/readDir.js";
import { GlobalFonts } from "@napi-rs/canvas";

/**
 * Loads all fonts from the /util/images/fonts folder
 *
 * @param {object} client - The Discord client
 * @returns {Promise<void>} Promise that resolves when all fonts are loaded
 * @throws {Error} Error that is thrown if a font could not be loaded
 */
export default async function loadFonts(client) {
 try {
  const loadTime = performance.now();
  const fonts = readDir(`${process.cwd()}/util/images/fonts/`, true, [".ttf"]);

  for (const font of fonts) {
   GlobalFonts.registerFromPath(font, font.split("/").pop().replace(".ttf", ""));
  }
  client.debugger("event", `Loaded ${fonts.length} fonts in ${client.performance(loadTime)}`);
 } catch (error) {
  client.debugger("error", `Error loading fonts: ${error.message}`);
 }
}
