import { colorReady } from "../../util/colors.js";

export function ready(client) {
 console.log(`${colorReady()} Logged in as ${client.user.tag}, id: ${client.user.id}`);
}
