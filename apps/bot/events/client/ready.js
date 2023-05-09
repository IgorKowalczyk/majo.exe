import { Logger } from "@majoexe/util/src/functions/logger.js";

export function ready(client) {
 Logger("ready", `Logged in as ${client.user.tag}, id: ${client.user.id}`);
}
