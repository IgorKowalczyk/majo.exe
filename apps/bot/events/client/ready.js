import { Logger } from "../../util/colors.js";

export function ready(client) {
 console.log(Logger("ready", `Logged in as ${client.user.tag}, id: ${client.user.id}`));
}
