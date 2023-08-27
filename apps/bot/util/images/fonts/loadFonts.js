import { Logger } from "@majoexe/util/functions";
import { GlobalFonts } from "@napi-rs/canvas";
import { globby } from "globby";

export async function loadFonts() {
 const time = Date.now();
 const fonts = await globby("./util/images/fonts/files/*.ttf");
 for (const font of fonts) {
  GlobalFonts.registerFromPath(font, font.split("/").pop().replace(".ttf", ""));
 }
 Logger("event", `Loaded ${fonts.length} fonts in ${Date.now() - time}ms`);
}
