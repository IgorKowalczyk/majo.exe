import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { Logger } from "./colors.js";
dotenv.config({ path: "../../.env" });

console.log(Logger("info", "Starting Majo.exe Bot..."));
console.log(Logger("info", "Running version v" + process.env.npm_package_version + " on Node.js " + process.version));

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

export default client;
