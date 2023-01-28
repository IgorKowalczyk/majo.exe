import { Logger } from "../../util/colors.js";

export function GuildCreate(client, guild) {
 console.log(Logger("info", `Joined guild ${guild.name} (${guild.id})`));
}
