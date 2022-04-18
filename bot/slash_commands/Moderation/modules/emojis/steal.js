const { MessageEmbed, Util } = require("discord.js");

module.exports = async (client, interaction, args) => {
 try {
  if (!args[1]) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You need to specify new emoji name!`);
  }
  if (args[2].length < 2 || args[2] > 32) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | New emoji name length should be between 2 and 32 characters`);
  }
  const custom_emoji = Util.parseEmoji(args[2]);
  if (!custom_emoji) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | The emoji name or ID is incorrect!`);
  }
  const emoji_url = `https://cdn.discordapp.com/emojis/${custom_emoji.id}.${custom_emoji.animated ? "gif" : "png"}`;
  interaction.guild.emojis.create(emoji_url, args[1]).then((emoji) => {
   const embed = new MessageEmbed()
    .setColor("#5865F2")
    .setTitle(`${client.bot_emojis.success} Emoji successfully created!`)
    .addField(`${client.bot_emojis.edit} Old Emoji name`, `\`\`\`${custom_emoji.name}\`\`\``, true)
    .addField(`${client.bot_emojis.screw_that} Old Emoji ID`, `\`\`\`${custom_emoji.id}\`\`\``, true)
    .addField(`${client.bot_emojis.link} Old Emoji URL`, `> <${emoji_url}>`)
    .addField(`${client.bot_emojis.edit} New Emoji name`, `\`\`\`${emoji.name}\`\`\``, true)
    .addField(`${client.bot_emojis.screw_that} New Emoji ID`, `\`\`\`${emoji.id}\`\`\``, true)
    .addField(`${client.bot_emojis.link} New Emoji URL`, `> <${emoji.url}>`)
    .setThumbnail(emoji_url)
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });

   return interaction.followUp({ embeds: [embed] });
  });
 } catch (err) {
  return client.createSlashError(interaction, `${client.bot_emojis.error} | Invaild emoji!`);
 }
};
