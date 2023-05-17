import { Logger } from "@majoexe/util/functions/index.js";

export function GuildCreate({ guild }) {
 Logger("info", `Joined guild ${guild.name} (${guild.id})`);
}
