const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction, args) => {
 const embed = new MessageEmbed()
  .setTitle(`${client.bot_emojis.discord_logo} ${client.user.username} Debug`)
  .setDescription(`These are the bot premissions on this server. If <@${client.user.id}> misses them some commands & functions will be disabled!`)
  .addField("Not required", `> \`ADMINISTRATOR\`: ${interaction.guild.me.permissions.has("ADMINISTRATOR") ? client.bot_emojis.success : client.bot_emojis.error}`)
  .addField(
   "Required",
   `
   > \`MANAGE_MESSAGES\`: ${interaction.guild.me.permissions.has("MANAGE_MESSAGES") ? client.bot_emojis.success : client.bot_emojis.error}
   > \`MANAGE_CHANNELS\`: ${interaction.guild.me.permissions.has("MANAGE_CHANNELS") ? client.bot_emojis.success : client.bot_emojis.error}
   > \`MANAGE_ROLES\`: ${interaction.guild.me.permissions.has("MANAGE_ROLES") ? client.bot_emojis.success : client.bot_emojis.error}
   > \`KICK_MEMBERS\`: ${interaction.guild.me.permissions.has("KICK_MEMBERS") ? client.bot_emojis.success : client.bot_emojis.error}
   > \`BAN_MEMBERS\`: ${interaction.guild.me.permissions.has("BAN_MEMBERS") ? client.bot_emojis.success : client.bot_emojis.error}
   > \`ADD_REACTIONS\`: ${interaction.guild.me.permissions.has("ADD_REACTIONS") ? client.bot_emojis.success : client.bot_emojis.error}
   > \`MANAGE_EMOJIS_AND_STICKERS\`: ${interaction.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS") ? client.bot_emojis.success : client.bot_emojis.error}
   > \`VIEW_AUDIT_LOG\`: ${interaction.guild.me.permissions.has("VIEW_AUDIT_LOG") ? client.bot_emojis.success : client.bot_emojis.error}
   > \`SEND_MESSAGES\`: ${interaction.guild.me.permissions.has("SEND_MESSAGES") ? client.bot_emojis.success : client.bot_emojis.error}
   > \`MANAGE_MESSAGES\`: ${interaction.guild.me.permissions.has("MANAGE_MESSAGES") ? client.bot_emojis.success : client.bot_emojis.error}
   > \`EMBED_LINKS\`: ${interaction.guild.me.permissions.has("EMBED_LINKS") ? client.bot_emojis.success : client.bot_emojis.error}
   > \`ATTACH_FILES\`: ${interaction.guild.me.permissions.has("ATTACH_FILES") ? client.bot_emojis.success : client.bot_emojis.error}
   > \`USE_EXTERNAL_EMOJIS\`: ${interaction.guild.me.permissions.has("USE_EXTERNAL_EMOJIS") ? client.bot_emojis.success : client.bot_emojis.error}`
  )
  .setTimestamp()
  .setColor("#5865F2")
  .setThumbnail(
   client.user.displayAvatarURL({
    dynamic: true,
    format: "png",
    size: 2048,
   })
  )
  .setFooter({
   text: `Requested by ${interaction.user.username}`,
   iconURL: interaction.user.displayAvatarURL({
    dynamic: true,
    format: "png",
    size: 2048,
   }),
  });
 interaction.followUp({ embeds: [embed] });
};
