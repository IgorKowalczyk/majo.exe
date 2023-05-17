import { Logger } from "@majoexe/util/functions/index.js";

export function GuildDelete({ guild }) {
 Logger("info", `Leaved guild ${guild.name} (${guild.id})`);
}
