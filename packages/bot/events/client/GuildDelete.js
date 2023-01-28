import { Logger } from "../../util/colors.js";

export function GuildDelete(client, guild) {
 console.log(Logger("info", `Leaved guild ${guild.name} (${guild.id})`));
}
