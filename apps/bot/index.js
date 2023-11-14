import client from "./client/client.js";

process.on("unhandledRejection", (reason) => {
 client.debugger("error", reason);
});
