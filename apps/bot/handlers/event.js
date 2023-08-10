import { readdirSync } from "node:fs";

export default async function loadEvents(client) {
 const loadTime = performance.now();

 const read = async (dirs) => {
  const events = readdirSync(`${process.cwd()}/events/${dirs}/`).filter((d) => d.endsWith("js"));
  for (const file of events) {
   await import(`${process.cwd()}/events/${dirs}/${file}`).then((e) => {
    const eventName = file.split(".")[0];
    client.config.displayEventList && client.debugger("info", `Loaded event ${eventName} from /events/${dirs}/${file}`);
    client.on(eventName, e[eventName].bind(null, client));
   });
  }
  client.debugger("event", `Loaded ${events.length} events from /events/${dirs} in ${client.performance(loadTime)}`);
 };

 ["client", "guild"].forEach((x) => read(x));
}
