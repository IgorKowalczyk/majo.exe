const { Collection, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const emojis = require("../../config/emojis_config");
const config = require("../../config/main_config");
const additional_config = require("../../config/additional_config");
const backup = require("discord-backup");

module.exports = function (client) {
 client.config = config;
 client.additional_config = additional_config;
 client.bot_emojis = emojis;
 client.backupManager = backup;
 client.max_input = config.max_input;
 client.backupManager.setStorageFolder(`${process.cwd()}/database/backups`);
 client.commands = new Collection();
 client.aliases = new Collection();
 client.snipes = new Collection();
 client.giveawaysManager = require("../giveaways/giveaways")(client);
 const logs = require("discord-logs");
 logs(client);
 client.createCommandError = function (message, err) {
  if (!message) throw new Error("You must provide message object to create new error!");
  const error = new MessageEmbed() // Prettier
   .setTitle(`${emojis.error} A wild error appeared!`)
   .setDescription(`>>> \`\`\`${err.toString().slice(0, 1000) || `Something went wrong... ${emojis.sadness}`}\`\`\``)
   .setFooter({ text: `Error  nr. ${message.channel.id}/${message.id}`, iconURL: client.user.displayAvatarURL() })
   .setColor("RED");
  const row = new MessageActionRow() // Prettier
   .addComponents(
    // Prettier
    new MessageButton() // Prettier
     .setStyle("LINK")
     .setLabel("Report the error!")
     .setURL(config.support_server)
   );
  return message.reply({ embeds: [error], components: [row] });
 };
 client.createError = function (message, error_message, color, error_ephemeral) {
  if (!message) throw new Error("You must provide message object to create new error!");
  if (!error_message) throw new Error("You must provide error_message text to create new error!");
  const error = new MessageEmbed() // Prettier
   .setColor(color || "RED")
   .setDescription(error_message);
  return message.reply({ embeds: [error], ephemeral: error_ephemeral ? true : false });
 };
 client.createSlashError = function (interaction, error_message, color, error_ephemeral) {
  if (!interaction) throw new Error("You must provide interaction object to create new error!");
  if (!error_message) throw new Error("You must provide error_message text to create new error!");
  const error = new MessageEmbed() // Prettier
   .setColor(color || "RED")
   .setDescription(error_message);
  return interaction.followUp({ embeds: [error], ephemeral: error_ephemeral ? true : false });
 };
 client.createSlashCommandError = function (interaction, err) {
  if (!interaction) throw new Error("You must provide interaction object to create new error!");
  const error = new MessageEmbed() // Prettier
   .setTitle(`❌ A wild error appeared!`)
   .setDescription(`>>> \`\`\`${err.toString().slice(0, 1000) || `Something went wrong... 😢`}\`\`\``)
   .setFooter({ text: `Error  nr. ${interaction.id}/${interaction.guild.id}`, iconURL: client.user.displayAvatarURL() })
   .setColor("RED");
  const row = new MessageActionRow() // Prettier
   .addComponents(
    // Prettier
    new MessageButton() // Prettier
     .setStyle("LINK")
     .setLabel("Report the error!")
     .setURL(config.support_server)
   );
  return interaction.followUp({ embeds: [error], components: [row] });
 };
};
