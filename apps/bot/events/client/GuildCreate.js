import { Logger } from "@majoexe/util/src/functions/logger.js";

export function GuildCreate({ guild }) {
 Logger("info", `Joined guild ${guild.name} (${guild.id})`);
}
