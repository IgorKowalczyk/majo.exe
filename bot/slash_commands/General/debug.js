const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "debug",
 description: "Debug bot in this server",
 run: async (client, interaction, args) => {
  try {
   const embed = new MessageEmbed()
    .setTitle(`${client.bot_emojis.discord_logo} ${client.user.username} Debug`)
    .setDescription(
     `These are the bot premissions on this server. If <@${client.user.id}> misses them some commands & functions will be disabled!
     • \`ADMINISTRATOR\`: ${interaction.guild.me.permissions.has("ADMINISTRATOR") ? `${client.bot_emojis.success}` : `${client.bot_emojis.error}`}\n
     • \`MANAGE_MESSAGES\`: ${interaction.guild.me.permissions.has("MANAGE_MESSAGES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_CHANNELS\`: ${interaction.guild.me.permissions.has("MANAGE_CHANNELS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_ROLES\`: ${interaction.guild.me.permissions.has("MANAGE_ROLES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`KICK_MEMBERS\`: ${interaction.guild.me.permissions.has("KICK_MEMBERS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`BAN_MEMBERS\`: ${interaction.guild.me.permissions.has("BAN_MEMBERS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`ADD_REACTIONS\`: ${interaction.guild.me.permissions.has("ADD_REACTIONS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_EMOJIS_AND_STICKERS\`: ${interaction.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`VIEW_AUDIT_LOG\`: ${interaction.guild.me.permissions.has("VIEW_AUDIT_LOG") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`SEND_MESSAGES\`: ${interaction.guild.me.permissions.has("SEND_MESSAGES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_MESSAGES\`: ${interaction.guild.me.permissions.has("MANAGE_MESSAGES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`EMBED_LINKS\`: ${interaction.guild.me.permissions.has("EMBED_LINKS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`ATTACH_FILES\`: ${interaction.guild.me.permissions.has("ATTACH_FILES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`USE_EXTERNAL_EMOJIS\`: ${interaction.guild.me.permissions.has("USE_EXTERNAL_EMOJIS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     > ${client.bot_emojis.stopwatch} Ping: ${Math.round(client.ws.ping)}ms`
    )
    .setTimestamp()
    .setColor("#4f545c")
    .setFooter({
     text: `Requested by ${interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   interaction.followUp({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
