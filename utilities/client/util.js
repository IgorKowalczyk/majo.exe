const Discord = require("discord.js");
const emojis = require("../../config/emojis_config");
const config = require("../../config/main_config");
const additional_config = require("../../config/additional_config");
const backup = require("discord-backup");
const io = require("@pm2/io");
const fetch = require("node-fetch");
const osu = require("node-os-utils");
const cpu = osu.cpu;
const drive = osu.drive;

module.exports = function (client) {
 client.config = config;
 client.additional_config = additional_config;
 client.bot_emojis = emojis;
 client.backupManager = backup;
 client.max_input = config.max_input;
 client.backupManager.setStorageFolder(`${process.cwd()}/database`);
 client.prefix = process.env.PREFIX; // DEPRECATED
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 client.slash_commands = new Discord.Collection();
 client.extra_slash_commands = new Discord.Collection();
 client.snipes = new Discord.Collection();
 client.queue = new Map();
 client.all_commands = 0;
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

 if (config.send_statistics && config.domain && process.env.SECRET) {
  setInterval(() => {
   cpu.usage().then((cpupercentage) => {
    drive.info().then((driveinf) => {
     const driveinf0 = JSON.stringify(driveinf);
     const driveinfo = JSON.parse(driveinf0);
     fetch(`${config.domain}/dashboard/statistics`, {
      method: "POST",
      body: JSON.stringify({
       uptime: client.uptime,
       servers: client.guilds.cache.size,
       members: client.guilds.cache.reduce((a, b) => a + b.memberCount, 0),
       ping: Math.round(client.ws.ping),
       cpu_usage: cpupercentage,
       ram: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}`,
       drive: `${driveinfo.usedGb}/${driveinfo.totalGb}`,
      }),
      headers: {
       "Content-type": "application/json",
       Authorization: process.env.SECRET,
      },
     });
    });
   });
  }, 30000);
 }
};
