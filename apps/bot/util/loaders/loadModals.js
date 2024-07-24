import { globby } from "@majoexe/util/functions/files/globby.js";
import { Collection } from "discord.js";

/**
 * Loads all modals from the /modals folder
 *
 * @param {object} client - The Discord client
 * @returns {Promise<void>} Promise that resolves when all modals are loaded
 * @throws {Error} Error that is thrown if a modal could not be loaded
 */
export default async function loadModals(client) {
 try {
  const loadTime = performance.now();
  client.modals = new Collection();

  const modals = await globby(`${process.cwd()}/modals/**/*.js`);
  for (const value of modals) {
   try {
    const file = await import(value);
    const { default: modal } = file;

    if (!modal) {
     client.debugger("error", `Modal ${value} doesn't have a default export!`);
     continue;
    }

    const { id, run } = modal;

    if (!id || !run) {
     client.debugger("error", `Modal ${value} is missing required properties!`);
     continue;
    }

    client.modals.set(id, modal);

    if (client.config.displayModalList) {
     client.debugger("info", `Loaded modal ${id} from ${value.replace(process.cwd(), "")}`);
    }
   } catch (error) {
    client.debugger("error", `Error loading modal ${value}: ${error.message}`);
   }
  }
  client.debugger("event", `Loaded ${client.modals.size} modals from /modals in ${client.performance(loadTime)}`);
 } catch (error) {
  client.debugger("error", `Error loading modals: ${error.message}`);
 }
}
