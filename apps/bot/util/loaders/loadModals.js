import { Collection } from "discord.js";
import { globby } from "globby";

export default async function loadModals(client) {
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
}
