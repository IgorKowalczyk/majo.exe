import { REST } from "@discordjs/rest";
import { Logger } from "@majoexe/util/src/functions/logger.js";
import chalk from "chalk";
import { Routes } from "discord-api-types/v10";
import { Client, GatewayIntentBits, PermissionsBitField, Collection } from "discord.js";
import dotenv from "dotenv";
import { globby } from "globby";
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
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
const slashCommands = await globby(`${process.cwd()}/slashCommands/**/*.js`);
const slash = [];
client.slashCommands = new Collection();

client.performance = (time) => {
 const run = Math.floor(performance.now() - time);
 if (run < 500) return chalk.underline(`${run}ms`);
 if (run > 500) return chalk.underline.red(`${run}ms`);
};

for (const value of slashCommands) {
 const file = await import(value);
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

 slash.push({
  name: file.default.name,
  description: file.default.description,
  type: file.default.type,
  options: file.default.options ? file.default.options : null,
  default_permission: file.default.default_permission ? file.default.default_permission : null,
  default_member_permissions: file.default.default_member_permissions ? PermissionsBitField.resolve(file.default.default_member_permissions).toString() : null,
 });
 client.slashCommands.set(file.default.name, file.default);
 config.debugger.displayCommandList && Logger("info", `Loaded slash command ${file.default.name} from ${value.replace(process.cwd(), "")}`);
}

Logger("event", `Loaded ${slash.length} slash commands from /slashCommands in ${client.performance(loadTime)}`);
const registerTime = performance.now();
Logger("info", "Registering slash commands...");

await rest
 .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: slash })
 .then(() => {
  Logger("event", `Successfully registered ${slash.length} slash commands in ${client.performance(registerTime)}`);
 })
 .catch((error) => {
  console.log(error);
 });

export default client;
