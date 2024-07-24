import { readdirSync, statSync } from "node:fs";
import path from "node:path";

/**
 * Read all files with specified extensions in a directory, optionally including subdirectories
 *
 * @param {string} dir - The directory to read
 * @param {boolean} [recursive=false] - Whether to include subdirectories
 * @param {string|string[]} [extensions=['.js']] - The file extension(s) to include
 * @returns {string[]} - The files in the directory with the specified extensions
 * @example
 * const jsFiles = readDir("./src", true, '.js');
 * console.log(jsFiles);
 * // => [ "./src/index.js", "./src/lib/util.js", ... ]
 *
 * const cssAndJsFiles = readDir("./src", true, ['.js', '.css']);
 * console.log(cssAndJsFiles);
 * // => [ "./src/index.js", "./src/style.css", "./src/lib/util.js", ... ]
 */
export function readDir(dir, recursive = false, extensions = [".js"]) {
 if (typeof extensions === "string") {
  extensions = [extensions];
 }
 const files = readdirSync(dir);
 let directories = [];

 files.forEach((file) => {
  const filePath = path.join(dir, file);
  const stat = statSync(filePath);

  if (stat.isDirectory() && recursive) {
   directories = directories.concat(readDir(filePath, true, extensions));
  } else if (stat.isFile() && extensions.some((ext) => filePath.endsWith(ext))) {
   directories.push(filePath.split(path.sep).join("/"));
  }
 });

 return directories;
}
