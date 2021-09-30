const Discord = require("discord.js");
const emojis = require("../config/emojis_config");
const config = require("../config/main_config");

module.exports = function (client) {
 client.config = config;
 client.bot_emojis = emojis;
 client.command_error_embed = new Discord.MessageEmbed() // Prettier
  .setDescription(`Something went wrong... ${emojis.sadness}`)
  .setColor("RED");
 client.prefix = process.env.PREFIX; // WIP - Per server prefix
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 client.slashCommands = new Discord.Collection();
 client.snipes = new Discord.Collection();
 client.queue = new Map();
 client.giveawaysManager = require("./giveaways")(client);
 const logs = require("discord-logs");
 logs(client);
};
