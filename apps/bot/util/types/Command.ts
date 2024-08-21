import { type ChatInputApplicationCommandData, CommandInteraction, AutocompleteInteraction, Message } from "discord.js";
import type { Majobot } from "../..";

export interface GuildSettings {
 embedColor: string;
 publicPage: boolean;
 vanity?: string;
}

export interface SlashCommand extends ChatInputApplicationCommandData {
 category: string;
 cooldown?: number;
 defer?: boolean;
 run: (client: Majobot, interaction: CommandInteraction, args: GuildSettings) => Promise<Message | void>;
 autocomplete?: (client: Majobot, interaction: AutocompleteInteraction) => Promise<void>;
}
