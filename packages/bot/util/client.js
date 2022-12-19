import { Client, GatewayIntentBits } from "discord.js";
import { colorInfo, colorWarn } from "./colors.js";

console.log(colorInfo() + " Starting Majo.exe Bot...");
console.log(colorInfo() + " Running version v" + process.env.npm_package_version + " on Node.js " + process.version);
console.log(colorWarn() + " Check out the source code at https://github.com/igorkowalczyk/majo.exe");

const client = new Client({
 intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions],
});

try {
 client.login(process.env.TOKEN);
} catch (error) {
 console.log(error);
}

export default client;

// Todo: Add more options
