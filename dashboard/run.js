const Discord = require("discord.js");
const client = new Discord.Client({
 allowedMentions: {
  parse: ["users", "roles"],
  repliedUser: true,
 },
 intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_WEBHOOKS, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING],
});

require("dotenv").config();
const chalk = require("chalk");

client.on("ready", () => {
 if (process.env.DASHBOARD == "true") {
  console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Getting dashboard config file..."));
  const webrun = require("./dashboard");
  webrun(client);
 } else {
  console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Not running dashboard! The dashboard config value (process.env.DASHBOARD) is set to " + process.env.DASHBOARD + ". Please change it to `true` to run the dashboard."));
 }
});

if (process.env.TOKEN) {
 client.login(process.env.TOKEN);
 console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Web dashboard client logged"));
} else {
 throw new Error("[MAJO] You need to enter bot token to run dashboard!");
}
