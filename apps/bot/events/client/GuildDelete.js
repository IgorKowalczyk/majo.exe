import { Logger } from "@majoexe/util/src/functions/logger.js";

export function GuildDelete({ guild }) {
 console.log(Logger("info", `Leaved guild ${guild.name} (${guild.id})`));
}
