import { globalConfig, botConfig, debuggerConfig, dashboardConfig } from "@majoexe/config";
import { createErrorEmbed } from "@majoexe/util/embeds";
import { Logger } from "@majoexe/util/functions";
import chalk from "chalk";
import { Client, GatewayIntentBits, PermissionsBitField, Collection } from "discord.js";
import { globby } from "globby";
import giveaway from "../util/giveaway/core.js";
import { loadFonts } from "../util/images/fonts/loadFonts.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const cwd = dirname(fileURLToPath(import.meta.url)).replace("/client", "");
Logger("info", `Current working directory: ${cwd}`);
process.chdir(cwd);

Logger("info", "Starting Majo.exe Bot...");
Logger("info", `Running version v${process.env.npm_package_version} on Node.js ${process.version} on ${process.platform} ${process.arch}`);
Logger("info", "Check out the source code at https://github.com/igorkowalczyk/majo.exe! Don't forget to star the repository, it helps a lot!");

if (process.env.NODE_ENV !== "production") {
 Logger("warn", "This is a development version of Majo.exe. It may be unstable and may contain bugs. Use at your own risk!");
}

const client = new Client({
 intents: [
  // Prettier
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildModeration,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildMessageReactions,
 ],
});

const loadTime = performance.now();
const slashCommands = await globby(`${process.cwd()}/commands/**/*.js`);
const modalLoadTime = performance.now();
const modals = await globby(`${process.cwd()}/modals/**/*.js`);

// Add custom properties to client
client.slashCommands = new Collection();
client.modals = new Collection();
client.config = {
 ...botConfig,
 ...globalConfig,
 ...debuggerConfig,
 // Deprecated, to be replaced!
 dashboard: dashboardConfig,
};
client.giveawaysManager = giveaway(client);
client.errorMessages = {
 internalError: (interaction, error) => {
  Logger("error", error?.toString() ?? "Unknown error occured");
  const embed = createErrorEmbed("An error occured while executing this command. Please try again later.", "Unknown error occured");
  return interaction.followUp({ embeds: [embed], ephemeral: true });
 },
 /**
  * @param {interaction} interaction
  * @param {string} title
  * @param {string} description
  * */
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

client.additionalSlashCommands = 0;

client.performance = (time) => {
 const run = Math.floor(performance.now() - time);
 return run > 500 ? chalk.underline.red(`${run}ms`) : chalk.underline(`${run}ms`);
};

for (const value of slashCommands) {
 const file = await import(value);
 const category = value.split("/")[value.split("/").length - 2];
 if (!file.default) {
  Logger("error", `Slash command ${value} doesn't have a default export!`);
  continue;
 }
 if (!file.default.name) {
  Logger("error", `Slash command ${value} doesn't have a name!`);
  continue;
 }

 if (!file.default.description) {
  Logger("error", `Slash command ${value} doesn't have a description!`);
  continue;
 }

 if (!file.default.type) {
  Logger("error", `Slash command ${value} doesn't have a type!`);
  continue;
 }

 if (!file.default.run) {
  Logger("error", `Slash command ${value} doesn't have a run function!`);
  continue;
 }

 client.slashCommands.set(file.default.name, {
  ...file.default,
  category: category,
  options: file.default.options ? file.default.options : null,
  default_permission: file.default.default_permission ? file.default.default_permission : null,
  default_member_permissions: file.default.default_member_permissions ? PermissionsBitField.resolve(file.default.default_member_permissions).toString() : null,
 });
 file.default.options &&
  file.default.options.map((option) => {
   if (option.type === 1) {
    debuggerConfig.displayCommandList && Logger("info", `Loaded slash subcommand ${option.name} from ${value.replace(process.cwd(), "")}`);
    client.additionalSlashCommands++;
   }
  });
 debuggerConfig.displayCommandList && Logger("info", `Loaded slash command ${file.default.name} from ${value.replace(process.cwd(), "")}`);
}

for (const value of modals) {
 const file = await import(value);
 if (!file.default) {
  Logger("error", `Modal ${value} doesn't have a default export!`);
  continue;
 }
 if (!file.default.id) {
  Logger("error", `Modal ${value} doesn't have a id!`);
  continue;
 }

 if (!file.default.run) {
  Logger("error", `Modal ${value} doesn't have a run function!`);
  continue;
 }

 client.modals.set(file.default.id, {
  ...file.default,
 });
 debuggerConfig.displayModalList && Logger("info", `Loaded modal ${file.default.id} from ${value.replace(process.cwd(), "")}`);
}

Logger("event", `Loaded ${client.modals.size} modals from /modals in ${client.performance(modalLoadTime)}`);
Logger("event", `Loaded ${client.slashCommands.size + client.additionalSlashCommands} slash commands from /commands in ${client.performance(loadTime)}`);
await loadFonts();

Logger("info", "Logging in...");

try {
 client.login(process.env.TOKEN);
} catch (error) {
 console.log(Logger("error", error));
}

export default client;
