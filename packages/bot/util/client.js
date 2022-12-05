import { Client, GatewayIntentBits } from "discord.js";
import { color_info, color_warn } from "./colors.js";

console.log(color_info() + " Starting Majo.exe Bot...");
console.log(color_info() + " Running version v" + process.env.npm_package_version + " on Node.js " + process.version);
console.log(color_warn() + " Check out the source code at https://github.com/igorkowalczyk/majo.exe");

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
