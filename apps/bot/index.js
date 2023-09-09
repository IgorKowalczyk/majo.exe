import client from "./client/client.js";
import loadEvents from "./util/loaders/loadEvents.js";

loadEvents(client);

process.on("unhandledRejection", (reason) => {
 client.debugger("error", reason);
});
