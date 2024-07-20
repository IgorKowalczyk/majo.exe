import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { globalConfig, botConfig, debuggerConfig, dashboardConfig, globalPermissions } from "@majoexe/config";
import { createErrorEmbed } from "@majoexe/util/embeds";
import { Logger, chalk } from "@majoexe/util/functions/util";
import { Client, GatewayIntentBits } from "discord.js";
import giveaway from "./util/giveaway/core.js";
import loadCommands from "./util/loaders/loadCommands.js";
import loadEmojis from "./util/loaders/loadEmojis.js";
import loadEvents from "./util/loaders/loadEvents.js";
import loadFonts from "./util/loaders/loadFonts.js";
import loadModals from "./util/loaders/loadModals.js";

const cwd = dirname(fileURLToPath(import.meta.url));
Logger("info", `Current working directory: ${cwd}`);
process.chdir(cwd);

Logger("info", "Starting Majo.exe Bot...");
Logger("info", `Running version v${process.env.npm_package_version} on Node.js ${process.version} on ${process.platform} ${process.arch}`);
Logger("info", "Check out the source code at https://github.com/igorkowalczyk/majo.exe! Don't forget to star the repository, it helps a lot!");

const client = new Client({
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

client.commandsRan = 0;

client.giveawaysManager = giveaway(client);

client.errorMessages = {
 internalError: (interaction, error) => {
  Logger("error", error?.toString() ?? "Unknown error occured");
  const embed = createErrorEmbed("An error occured while executing this command. Please try again later.", "Unknown error occured");
  return interaction.followUp({ embeds: [embed], ephemeral: true });
 },
 createSlashError: (interaction, description, title) => {
  const embed = createErrorEmbed(description, title);
  embed.setFooter({
   text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
   iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
  });

  return interaction.followUp({ embeds: [embed], ephemeral: true });
 },
};

client.debugger = Logger;

client.performance = (time) => {
 const run = Math.floor(performance.now() - time);
 return run > 500 ? chalk.underline.red(`${run}ms`) : chalk.underline(`${run}ms`);
};

await loadCommands(client);
await loadModals(client);
await loadFonts(client);
await loadEvents(client);
await loadEmojis(client);

Logger("info", "Logging in...");

process.on("unhandledRejection", (reason) => {
 Logger("error", reason);
});

process.on("uncaughtException", (error) => {
 Logger("error", error);
});

process.on("warning", (warning) => {
 Logger("warn", warning);
});

await client.login(process.env.TOKEN);

export default client;
