import { basename } from "node:path";
import { readDir } from "@majoexe/util/functions/files/readDir.js";
import type { ClientEvents } from "discord.js";
import type { Majobot } from "@/index";

export default async function loadEvents(client: Majobot): Promise<void> {
 try {
  const loadTime = performance.now();

  const events = readDir(`${process.cwd()}/events/`, true, [".js", ".ts"]);

  for (const file of events) {
   await import(file).then((e) => {
    const eventName = basename(file).split(".")[0] as keyof ClientEvents;

    if (client.config.displayEventList) client.debugger("info", `Loaded event ${eventName} from ${file.replace(process.cwd(), "")}`);

    client.on(eventName, e[eventName].bind(null, client));
   });
  }

  client.debugger("event", `Loaded ${events.length} events from /events in ${client.performance(loadTime)}`);
 } catch (error) {
  client.debugger("error", `Error loading events: ${error}`);
 }
}
