import { createErrorEmbed } from "@majoexe/util/embeds";
import { Logger } from "@majoexe/util/functions";
import chalk from "chalk";
import { Client, GatewayIntentBits, PermissionsBitField, Collection } from "discord.js";
import dotenv from "dotenv";
import { globby } from "globby";
import { emojis } from "../config/emojis.js";
import { config } from "../config/index.js";
dotenv.config({ path: "../../.env" });

Logger("info", "Starting Majo.exe Bot...");
Logger("info", `Running version v${process.env.npm_package_version} on Node.js ${process.version} on ${process.platform} ${process.arch}`);

Logger("warn", "This is a development version of Majo.exe. It may be unstable and may contain bugs. Use at your own risk!");
Logger("warn", "Check out the source code at https://github.com/igorkowalczyk/majo.exe");

const client = new Client({
 intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions],
});

try {
 client.login(process.env.TOKEN);
} catch (error) {
 console.log(error);
}

const loadTime = performance.now();
const slashCommands = await globby(`${process.cwd()}/slashCommands/**/*.js`);

// Add custom properties to client
client.slashCommands = new Collection();
client.config = config;
client.botEmojis = emojis;
client.errorMessages = {
 generateErrorMessage: (interaction, error) => {
  Logger("error", error?.toString() ?? "Unknown error occured");
  const embed = createErrorEmbed(interaction);
  return interaction.reply({ embeds: [embed], ephemeral: true });
 },
};
client.debugger = Logger;

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
 config.debugger.displayCommandList && Logger("info", `Loaded slash command ${file.default.name} from ${value.replace(process.cwd(), "")}`);
}

Logger("event", `Loaded ${client.slashCommands.size} slash commands from /slashCommands in ${client.performance(loadTime)}`);

export default client;
