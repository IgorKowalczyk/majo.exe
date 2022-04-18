const { MessageEmbed } = require("discord.js");
const validator = require("validator");

module.exports = async (client, interaction, args) => {
 try {
  if (!interaction.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | I don't have premission to manage emojis!`);
  }
  if (!interaction.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You don't have premission to manage emojis!`);
  }
  if (!args[1]) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You must provide a name for the emoji.`);
  }
  if (args[1].length < 2 || args[1] > 32) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | Emoji name length should be between 2 and 32 characters`);
  }
  if (!args[2]) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You must provide vaild image for the emoji`);
  }
  if (!validator.isURL(args[2])) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You must provide vaild image for the emoji`);
  }
  interaction.guild.emojis
   .create(args[2], args[1])
   .then((emoji) => {
    const embed = new MessageEmbed()
     .setColor("#5865F2")
     .setTitle(`${client.bot_emojis.success} Emoji successfully created!`)
     .addField(`${client.bot_emojis.edit} Emoji name`, `\`\`\`${emoji.name}\`\`\``, true)
     .addField(`${client.bot_emojis.screw_that} Emoji ID`, `\`\`\`${emoji.id}\`\`\``, true)
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
   })
   .catch((err) => {
    client.createSlashError(interaction, `${client.bot_emojis.error} | The emoji url is incorrect or there are no more emoji slots available to add a new emoji!`);
   });
 } catch (err) {
  return client.createSlashError(interaction, `${client.bot_emojis.error} | ${err}`);
 }
};
