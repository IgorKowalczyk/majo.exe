import { basename } from "node:path";
import { globby } from "@majoexe/util/functions/util";

/**
 * Loads all events from the /events folder
 *
 * @param {object} client - The Discord client
 * @returns {Promise<void>} Promise that resolves when all events are loaded
 * @throws {Error} Error that is thrown if an event could not be loaded
 */
export default async function loadEvents(client) {
 try {
  const loadTime = performance.now();

  const events = await globby(`${process.cwd()}/events/*/*.js`);
  for (const file of events) {
   await import(file).then((e) => {
    const eventName = basename(file, ".js");
    client.config.displayEventList && client.debugger("info", `Loaded event ${eventName} from ${file.replace(process.cwd(), "")}`);
    client.on(eventName, e[eventName].bind(null, client));
   });
  }

  client.debugger("event", `Loaded ${events.length} events from /events in ${client.performance(loadTime)}`);
 } catch (error) {
  client.debugger("error", `Error loading events: ${error.message}`);
 }
}
