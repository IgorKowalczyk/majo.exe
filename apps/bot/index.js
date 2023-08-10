import client from "./client/client.js";
import loadEvents from "./handlers/event.js";

loadEvents(client);

process.on("unhandledRejection", (reason) => {
 client.debugger("error", reason);
});
