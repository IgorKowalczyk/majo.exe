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
    .setTitle("Premission check")
    .setDescription(
     `These are the bot premissions on this server. If ${client.user.username} misses them some commands & functions will be disabled!
     • \`ADMINISTRATOR\`: ${message.guild.me.hasPermission("ADMINISTRATOR") ? "<:success:860884617820110909>" : "<:error:860884617770303519>"}\n
     • \`MANAGE_MESSAGES\`: ${message.guild.me.hasPermission("MANAGE_MESSAGES") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
     • \`MANAGE_CHANNELS\`: ${message.guild.me.hasPermission("MANAGE_CHANNELS") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
     • \`KICK_MEMBERS\`: ${message.guild.me.hasPermission("KICK_MEMBERS") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
     • \`BAN_MEMBERS\`: ${message.guild.me.hasPermission("BAN_MEMBERS") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
     • \`ADD_REACTIONS\`: ${message.guild.me.hasPermission("ADD_REACTIONS") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
     • \`MANAGE_EMOJIS_AND_STICKERS\`: ${message.guild.me.hasPermission("MANAGE_EMOJIS_AND_STICKERS") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
     • \`VIEW_AUDIT_LOG\`: ${message.guild.me.hasPermission("VIEW_AUDIT_LOG") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
     • \`SEND_MESSAGES\`: ${message.guild.me.hasPermission("SEND_MESSAGES") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
     • \`MANAGE_MESSAGES\`: ${message.guild.me.hasPermission("MANAGE_MESSAGES") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
     • \`EMBED_LINKS\`: ${message.guild.me.hasPermission("EMBED_LINKS") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
     • \`ATTACH_FILES\`: ${message.guild.me.hasPermission("ATTACH_FILES") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
     • \`USE_EXTERNAL_EMOJIS\`: ${message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
     • \`CONNECT\`: ${message.guild.me.hasPermission("CONNECT") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
     • \`SPEAK\`: ${message.guild.me.hasPermission("SPEAK") ? "<:success:860884617820110909> Passed!" : "<:error:860884617770303519> Error!"}
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
