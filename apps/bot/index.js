import { Logger } from "@majoexe/util/src/functions/logger.js";
import client from "./client/client.js";
import loadEvents from "./handlers/event.js";

loadEvents(client);

process.on("unhandledRejection", (reason) => {
 Logger("error", reason);
});
