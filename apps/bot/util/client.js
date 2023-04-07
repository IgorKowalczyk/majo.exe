import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { Client, GatewayIntentBits, PermissionsBitField, Collection } from "discord.js";
import dotenv from "dotenv";
import { globby } from "globby";
import { Logger } from "./colors.js";
dotenv.config({ path: "../../.env" });

console.log(Logger("info", "Starting Majo.exe Bot..."));
console.log(Logger("info", `Running version v${process.env.npm_package_version} on Node.js ${process.version} on ${process.platform} ${process.arch}`));

console.log(Logger("warn", "This is a development version of Majo.exe. It may be unstable and may contain bugs. Use at your own risk!"));
console.log(Logger("warn", "Check out the source code at https://github.com/igorkowalczyk/majo.exe"));

const client = new Client({
 intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions],
});

try {
 client.login(process.env.TOKEN);
} catch (error) {
 console.log(error);
}

const time = performance.now();
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
console.log(Logger("info", "Loading slash commands..."));
const slashCommands = await globby(`${process.cwd()}/slashCommands/**/*.js`);
const slash = [];
client.slashCommands = new Collection();

for (const value of slashCommands) {
 const file = await import(value);
 slash.push({
  name: file.default.name,
  description: file.default.description,
  type: file.default.type,
  options: file.default.options ? file.default.options : null,
  default_permission: file.default.default_permission ? file.default.default_permission : null,
  default_member_permissions: file.default.default_member_permissions ? PermissionsBitField.resolve(file.default.default_member_permissions).toString() : null,
 });
 client.slashCommands.set(file.default.name, file.default);
 console.log(Logger("info", `Loaded slash command ${file.default.name} from ${value}`));
}

console.log(Logger("info", "Registering slash commands..."));
await rest
 .put(Routes.applicationCommands(process.env.CLIENT_ID), { body: slash })
 .then(() => {
  console.log(Logger("info", `Successfully registered ${slash.length} slash commands in ${performance.now() - time}ms`));
 })
 .catch((error) => {
  console.log(error);
 });

export default client;
