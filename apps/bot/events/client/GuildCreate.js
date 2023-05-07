import { Logger } from "@majoexe/util/src/functions/logger.js";

export function GuildCreate({ guild }) {
 console.log(Logger("info", `Joined guild ${guild.name} (${guild.id})`));
}
