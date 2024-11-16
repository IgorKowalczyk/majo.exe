import type { Guild, GuildDisabledCategories, GuildDisabledCommands } from "@majoexe/database";
import { type ChatInputApplicationCommandData, ChatInputCommandInteraction, AutocompleteInteraction, Message, type ApplicationCommandOptionData } from "discord.js";
import type { Majobot } from "@/index";

export interface GuildSettings extends Pick<Guild, "embedColor" | "publicPage" | "vanity"> {
 guildDisabledCommands: GuildDisabledCommands[];
 guildDisabledCategories: GuildDisabledCategories[];
}

// Create a new type that includes the usage property
type ExtendedApplicationCommandOptionData = ApplicationCommandOptionData & { usage?: string };

export interface SlashCommand extends ChatInputApplicationCommandData {
 category?: string;
 cooldown?: number;
 defer?: boolean;
 usage: string;
 options?: readonly ExtendedApplicationCommandOptionData[];
 run: (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings?: GuildSettings) => Promise<Message | void>;
 autocomplete?: (client: Majobot, interaction: AutocompleteInteraction) => Promise<void>;
}
