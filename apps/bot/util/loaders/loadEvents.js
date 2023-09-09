import { globby } from "globby";
import { basename } from "node:path";

export default async function loadEvents(client) {
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
}
