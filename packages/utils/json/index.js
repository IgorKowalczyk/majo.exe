import { readFileSync } from "fs";
import path from "path";

/**
 * @param {string} name - The name of the json file to import
 * @returns {Promise<object>} - The parsed json file
 * @example
 * const advices = await ImportJSON("advices");
 * console.log(advices);
 * // => [ { advice: 'If you are afraid of something, you should do it.' }, ... ]
 **/
export function ImportJSON(name) {
 const currentModuleFileUrl = import.meta.url;
 const currentModuleFolderPath = path.dirname(new URL(currentModuleFileUrl).pathname);
 const filePath = path.join(currentModuleFolderPath, `${name}.json`);
 const fileContent = readFileSync(filePath, "utf8");

 return JSON.parse(fileContent);
}
