import { Logger } from "../../util/colors.js";

export function GuildDelete({ guild }) {
 console.log(Logger("info", `Leaved guild ${guild.name} (${guild.id})`));
}
