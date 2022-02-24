const Discord = require("discord.js");
const emojis = require("../../config/emojis_config");
const config = require("../../config/main_config");
const additional_config = require("../../config/additional_config");
const backup = require("discord-backup");
const io = require("@pm2/io");

module.exports = function (client) {
 client.config = config;
 client.additional_config = additional_config;
 client.bot_emojis = emojis;
 client.backupManager = backup;
 client.max_input = config.max_input;
 client.backupManager.setStorageFolder(`${process.cwd()}/database`);
 client.prefix = process.env.PREFIX; // WIP - Per server prefix
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 client.slash_commands = new Discord.Collection();
 client.snipes = new Discord.Collection();
 client.queue = new Map();
 client.giveawaysManager = require("../giveaways")(client);
 if (additional_config.pm2.enabled == true) {
  if (additional_config.pm2.metrics.messages_seen == true) {
   client.messages_seen = io.counter({
    name: "Messages seen",
    type: "counter",
   });
  }
  if (additional_config.pm2.metrics.commands_used == true) {
   client.commands_used = io.counter({
    name: "Commands used",
    type: "counter",
   });
  }
  if (additional_config.pm2.metrics.slash_commands_used == true) {
   client.slash_commands_used = io.counter({
    name: "Slash commands used",
    type: "counter",
   });
  }
  if (additional_config.pm2.metrics.ws_ping == true) {
   client.bot_ping_metrics = io.histogram({
    name: "Bot Ping (ms)",
    measurement: "mean",
   });
  }
  if (additional_config.pm2.metrics.users_count == true) {
   client.users_count = io.histogram({
    name: "Users count",
    measurement: "mean",
   });
  }
  if (additional_config.pm2.metrics.guilds_count == true) {
   client.guilds_count = io.histogram({
    name: "Guilds count",
    measurement: "mean",
   });
  }
 }
 const logs = require("discord-logs");
 logs(client);
 process.env.SESSION_SECRET = "";
 for (let i = 0; i <= 15; i++) {
  process.env.SESSION_SECRET += Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6) + i;
 }
 client.createCommandError = function (message, err) {
  if (!message) throw new Error("You must provide message object to create new error!");
  const error = new Discord.MessageEmbed() // Prettier
   .setTitle(`${emojis.error} A wild error appeared!`)
   .setDescription(`>>> \`\`\`${err.toString().slice(0, 1000) || `Something went wrong... ${emojis.sadness}`}\`\`\``)
   .setFooter({ text: `Error  nr. ${message.channel.id}/${message.id}`, iconURL: client.user.displayAvatarURL() })
   .setColor("RED");
  const row = new Discord.MessageActionRow() // Prettier
   .addComponents(
    // Prettier
    new Discord.MessageButton() // Prettier
     .setStyle("LINK")
     .setLabel("Report the error!")
     .setURL(config.support_server)
   );
  return message.reply({ embeds: [error], components: [row] });
 };
 client.createError = function (message, error_message, color, error_ephemeral) {
  if (!message) throw new Error("You must provide message object to create new error!");
  if (!error_message) throw new Error("You must provide error_message text to create new error!");
  const error = new Discord.MessageEmbed() // Prettier
   .setColor(color || "RED")
   .setDescription(error_message);
  return message.reply({ embeds: [error], ephemeral: error_ephemeral ? true : false });
 };
 client.createSlashError = function (interaction, error_message, color, error_ephemeral) {
  if (!interaction) throw new Error("You must provide interaction object to create new error!");
  if (!error_message) throw new Error("You must provide error_message text to create new error!");
  const error = new Discord.MessageEmbed() // Prettier
   .setColor(color || "RED")
   .setDescription(error_message);
  return interaction.followUp({ embeds: [error], ephemeral: error_ephemeral ? true : false });
 };
 client.createSlashCommandError = function (interaction, err) {
  if (!interaction) throw new Error("You must provide interaction object to create new error!");
  const error = new Discord.MessageEmbed() // Prettier
   .setTitle(`❌ A wild error appeared!`)
   .setDescription(`>>> \`\`\`${err.toString().slice(0, 1000) || `Something went wrong... 😢`}\`\`\``)
   .setFooter({ text: `Error  nr. ${interaction.id}/${interaction.guild.id}`, iconURL: client.user.displayAvatarURL() })
   .setColor("RED");
  const row = new Discord.MessageActionRow() // Prettier
   .addComponents(
    // Prettier
    new Discord.MessageButton() // Prettier
     .setStyle("LINK")
     .setLabel("Report the error!")
     .setURL(config.support_server)
   );
  return interaction.followUp({ embeds: [error], components: [row] });
 };
};
