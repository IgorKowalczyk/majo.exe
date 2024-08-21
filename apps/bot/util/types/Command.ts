import type { Guild, GuildDisabledCategories, GuildDisabledCommands } from "@majoexe/database";
import { type ChatInputApplicationCommandData, CommandInteraction, AutocompleteInteraction, Message } from "discord.js";
import type { Majobot } from "../..";

export interface GuildSettings extends Pick<Guild, "embedColor" | "publicPage" | "vanity"> {
 guildDisabledCommands: GuildDisabledCommands[];
 guildDisabledCategories: GuildDisabledCategories[];
}
export interface SlashCommand extends ChatInputApplicationCommandData {
 category: string;
 cooldown?: number;
 defer?: boolean;
 dm_permission: boolean;
 usage: string;
 run: (client: Majobot, interaction: CommandInteraction, args: GuildSettings) => Promise<Message | void>;
 autocomplete?: (client: Majobot, interaction: AutocompleteInteraction) => Promise<void>;
}
