import { PathLike, readdirSync, statSync } from "node:fs";
import path from "node:path";

export function readDir(dir: PathLike, recursive = false, extensions = [".js"]) {
 if (typeof extensions === "string") {
  extensions = [extensions];
 }
 const files = readdirSync(dir.toString());
 let directories: string[] = [];

 files.forEach((file) => {
  const filePath = path.join(dir.toString(), file);
  const stat = statSync(filePath);

  if (stat.isDirectory() && recursive) {
   directories = directories.concat(readDir(filePath, true, extensions));
  } else if (stat.isFile() && extensions.some((ext) => filePath.endsWith(ext))) {
   directories.push(filePath.split(path.sep).join("/"));
  }
 });

 return directories;
}
