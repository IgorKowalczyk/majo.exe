import { color_ready } from "../../util/colors.js";

export function ready(client) {
 console.log(`${color_ready()} Logged in as ${client.user.tag}, id: ${client.user.id}`);
}
