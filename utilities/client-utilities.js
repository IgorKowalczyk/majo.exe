const Discord = require("discord.js");
const emojis = require("../config/emojis_config");
const config = require("../config/main_config");

module.exports = function (client) {
 client.config = config;
 client.bot_emojis = emojis;
 client.createCommandError = function (message, err) {
  if (!message) throw new Error("You must provide message object to create new error!");
  const error = new Discord.MessageEmbed() // Prettier
   .setTitle(`${emojis.error} A wild error appeared!`)
   .setDescription(`>>> \`\`\`${err.toString().slice(0, 1000) || `Something went wrong... ${emojis.sadness}`}\`\`\``)
   .setFooter(`Error  nr. ${message.channel.id}/${message.id}`, client.user.displayAvatarURL())
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
 client.prefix = process.env.PREFIX; // WIP - Per server prefix
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
 client.slashCommands = new Discord.Collection();
 client.snipes = new Discord.Collection();
 client.queue = new Map();
 client.giveawaysManager = require("./giveaways")(client);
 const logs = require("discord-logs");
 logs(client);
 client.createError = function (message, error_message, color) {
  if (!message) throw new Error("You must provide message object to create new error!");
  if (!error_message) throw new Error("You must provide error_message text to create new error!");
  const error = new Discord.MessageEmbed() // Prettier
   .setColor(color || "RED")
   .setDescription(error_message);
  return message.reply({ embeds: [error] });
 };
};
