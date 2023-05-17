import { Logger } from "@majoexe/util/functions/index.js";
import client from "./client/client.js";
import loadEvents from "./handlers/event.js";

loadEvents(client);

process.on("unhandledRejection", (reason) => {
 Logger("error", reason);
});
