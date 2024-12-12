import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { globalConfig, botConfig, debuggerConfig, dashboardConfig, globalPermissions } from "@majoexe/config";
import { createErrorEmbed } from "@majoexe/util/embeds";
import { Logger, chalk } from "@majoexe/util/functions/util";
// import type { GiveawaysManager } from "discord-giveaways";
import { GiveawaysManager } from "discord-giveaways";
import { Client, type CommandInteraction, GatewayIntentBits, Collection } from "discord.js";
import giveaway from "./util/giveaway/core";
import loadCommands from "./util/loaders/loadCommands";
import loadEmojis from "./util/loaders/loadEmojis";
import loadEvents from "./util/loaders/loadEvents";
import loadFonts from "./util/loaders/loadFonts";
import loadModals, { type Modal } from "./util/loaders/loadModals";
import type { SlashCommand } from "./util/types/Command";

const cwd = dirname(fileURLToPath(import.meta.url));
Logger("info", `Current working directory: ${cwd}`);
process.chdir(cwd);

Logger("info", "Starting Majo.exe Bot...");
Logger("info", `Running version v${process.env.npm_package_version} on Node.js ${process.version} on ${process.platform} ${process.arch}`);
Logger("info", "Check out the source code at https://github.com/igorkowalczyk/majo.exe! Don't forget to star the repository, it helps a lot!");

class Majobot extends Client {
 // eslint-disable-next-line typescript/no-explicit-any
 public config: Record<string, any> = {};
 public modals: Collection<string, Modal> = new Collection();
 public slashCommands: Collection<string, SlashCommand> = new Collection();
 public additionalSlashCommands: number = 0;
 public commandsRan: number = 0;
 public giveawaysManager: GiveawaysManager = {} as GiveawaysManager;
 public errorMessages: {
  internalError: (interaction: CommandInteraction, error: unknown) => Promise<void>;
  createSlashError: (interaction: CommandInteraction, description: string, title?: string) => void;
 } = {
  internalError: async (interaction: CommandInteraction, error: unknown): Promise<void> => {
   Logger("error", error?.toString() ?? "Unknown error occurred");
   const embed = createErrorEmbed("An error occurred while executing this command. Please try again later.", "Unknown error occurred");
   await interaction.followUp({ embeds: [embed], ephemeral: true });
  },
  createSlashError: (interaction: CommandInteraction, description: string, title?: string): void => {
   const embed = createErrorEmbed(description, title);
   embed.setFooter({
    text: `Requested by ${interaction.user.globalName ?? interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL(),
   });
   interaction.followUp({ embeds: [embed], ephemeral: true });
  },
 };
 public debugger: (type: "info" | "event" | "error" | "warn" | "ready" | "cron", message: string | unknown) => void = (type, message) => {
  Logger(type, message);
 };
 public performance: (time: number) => string = (time: number): string => {
  const run = Math.floor(performance.now() - time);
  return run > 500 ? chalk.underline.red(`${run}ms`) : chalk.underline(`${run}ms`);
 };

 // eslint-disable-next-line typescript/no-explicit-any
 constructor(options: any) {
  super(options);
 }
}

const client = new Majobot({
 intents: [
  // Prettier
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildModeration,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildMessageReactions,
 ],
});

client.config = {
 ...botConfig,
 ...globalPermissions,
 ...globalConfig,
 ...debuggerConfig,
 ...dashboardConfig,
};

await loadCommands(client);
await loadModals(client);
await loadFonts(client);
await loadEvents(client);
await loadEmojis(client);

client.giveawaysManager = giveaway(client) as unknown as GiveawaysManager;

Logger("info", "Logging in...");

process.on("unhandledRejection", (reason) => {
 Logger("error", `Unhandled rejection: ${reason}`);
});

process.on("uncaughtException", (error) => {
 Logger("error", `Uncaught exception: ${error}`);
});

process.on("warning", (warning) => {
 Logger("warn", `Warning: ${warning}`);
});

await client.login(process.env.TOKEN);

export default client;
export type { Majobot };
