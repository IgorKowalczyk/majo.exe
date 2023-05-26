import { Logger } from "@majoexe/util/functions";

export function GuildCreate({ guild }) {
 Logger("info", `Joined guild ${guild.name} (${guild.id})`);
}
