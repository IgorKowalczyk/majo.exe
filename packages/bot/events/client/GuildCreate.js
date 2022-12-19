import { colorInfo } from "../../util/colors.js";

export function GuildCreate(client, guild) {
 console.log(`${colorInfo()} Joined guild ${guild.name} (${guild.id})`);
}
