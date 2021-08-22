const Discord = require("discord.js");

module.exports = {
 name: "checkperm",
 aliases: ["check-perm", "perm-check", "checkperms", "check-perms", "perms-check"],
 description: "Check premission for the bot",
 category: "General",
 usage: "checkperm",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed()
    .setTitle(`${client.bot_emojis.discord_logo} Bot premissions check`)
    .setDescription(
     `These are the bot premissions on this server. If <@${client.user.id}> misses them some commands & functions will be disabled!
     • \`ADMINISTRATOR\`: ${message.guild.me.hasPermission("ADMINISTRATOR") ? `${client.bot_emojis.success}` : `${client.bot_emojis.error}`}\n
     • \`MANAGE_MESSAGES\`: ${message.guild.me.hasPermission("MANAGE_MESSAGES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_CHANNELS\`: ${message.guild.me.hasPermission("MANAGE_CHANNELS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`KICK_MEMBERS\`: ${message.guild.me.hasPermission("KICK_MEMBERS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`BAN_MEMBERS\`: ${message.guild.me.hasPermission("BAN_MEMBERS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`ADD_REACTIONS\`: ${message.guild.me.hasPermission("ADD_REACTIONS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_EMOJIS_AND_STICKERS\`: ${message.guild.me.hasPermission("MANAGE_EMOJIS_AND_STICKERS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`VIEW_AUDIT_LOG\`: ${message.guild.me.hasPermission("VIEW_AUDIT_LOG") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`SEND_MESSAGES\`: ${message.guild.me.hasPermission("SEND_MESSAGES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`MANAGE_MESSAGES\`: ${message.guild.me.hasPermission("MANAGE_MESSAGES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`EMBED_LINKS\`: ${message.guild.me.hasPermission("EMBED_LINKS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`ATTACH_FILES\`: ${message.guild.me.hasPermission("ATTACH_FILES") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`USE_EXTERNAL_EMOJIS\`: ${message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`CONNECT\`: ${message.guild.me.hasPermission("CONNECT") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     • \`SPEAK\`: ${message.guild.me.hasPermission("SPEAK") ? `${client.bot_emojis.success} Passed!` : `${client.bot_emojis.error} Error!`}
     `
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );

   message.lineReply(embed);
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
