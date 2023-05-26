import { Logger } from "@majoexe/util/functions";

export function GuildDelete({ guild }) {
 Logger("info", `Leaved guild ${guild.name} (${guild.id})`);
}
