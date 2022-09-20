import { readdirSync } from "fs";
import { color_info } from "../util/colors.js";

export default async function load_events(client) {
 const read = async (dirs) => {
  const events = readdirSync(`${process.cwd()}/events/${dirs}/`).filter((d) => d.endsWith("js"));
  for (const file of events) {
   await import(`${process.cwd()}/events/${dirs}/${file}`).then((e) => {
    const event_name = file.split(".")[0];
    console.log(`${color_info()} Loaded event ${event_name} from /events/${dirs}/${file}`);
    client.on(event_name, e[event_name].bind(null, client));
   });
  }
 };

 ["client", "guild"].forEach((x) => read(x));
}
