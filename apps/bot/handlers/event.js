import { Logger } from "@majoexe/util/src/functions/logger.js";
import { readdirSync } from "node:fs";

export default async function loadEvents(client) {
 console.log(Logger("info", "Loading events..."));
 const read = async (dirs) => {
  const events = readdirSync(`${process.cwd()}/events/${dirs}/`).filter((d) => d.endsWith("js"));
  for (const file of events) {
   await import(`${process.cwd()}/events/${dirs}/${file}`).then((e) => {
    const eventName = file.split(".")[0];
    console.log(Logger("info", `Loaded event ${eventName} from /events/${dirs}/${file}`));
    client.on(eventName, e[eventName].bind(null, client));
   });
  }
 };

 ["client", "guild"].forEach((x) => read(x));
}
