import type { GuildLogs, User } from "@majoexe/database/types";
import type { APIApplicationCommandOption } from "discord-api-types/v10";

export type ExtendedApplicationCommandOptionData = APIApplicationCommandOption & { usage?: string };

export interface Command {
 name: string;
 description: string;
 options: ExtendedApplicationCommandOptionData[];
 categoryName: string;
}

export interface LogItem extends Omit<GuildLogs, "createdAt"> {
 createdAt: string;
 user: Pick<User, "name" | "discordId" | "avatar" | "global_name" | "discriminator"> & { fullAvatar?: string };
}
