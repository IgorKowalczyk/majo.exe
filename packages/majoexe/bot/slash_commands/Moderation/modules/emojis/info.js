const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = async (client, interaction, args) => {
 try {
  if (!args[1]) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You need to specify vaild emoji!`);
  }
  if (!isNaN(args[1])) {
   emoji = await interaction.guild.emojis.fetch(args[1]);
  } else {
   emoji = interaction.guild.emojis.cache.find((emoji) => emoji.name === args[1].split(":")[1]);
  }
  if (!emoji) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | The emoji name or ID is incorrect!`);
  }
  const added_by = await emoji.fetchAuthor();
  const embed = new MessageEmbed()
   .setColor("#5865F2")
   .setTitle(`${emoji} Emoji info`)
   .addField(`${client.bot_emojis.edit} Emoji name`, `\`\`\`${emoji.name}\`\`\``, true)
   .addField(`${client.bot_emojis.screw_that} Emoji ID`, `\`\`\`${emoji.id}\`\`\``, true)
   .addField(`${client.bot_emojis.question} Animated`, `\`\`\`${emoji.animated ? "Yes" : "No"}\`\`\``, true)
   .addField(`Created by`, `> ${added_by}`, true)
   .addField(`Created at`, `> <t:${moment(emoji.createdAt).unix()}:R>`, true)
   .addField(`${client.bot_emojis.link} Emoji URL`, `> <${emoji.url}>`)
   .setThumbnail(emoji.url)
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   });
  return interaction.followUp({ embeds: [embed] });
 } catch (err) {
  return client.createSlashError(interaction, `${client.bot_emojis.error} | Invaild emoji!`);
 }
};
