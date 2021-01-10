/*
const Discord = require('discord.js');

module.exports = async (client, guild, user) => {
try {
 if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
 if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
 var logChannel = guild.channels.cache.find(c => c.name === "log");
 if (!logChannel) return;
 guild.fetchAuditLogs().then(logs => {
  var userID = logs.entries.first().executor.id;
   var userAvatar = logs.entries.first().executor.avatarURL();
   let unBanInfo = new Discord.MessageEmbed()
    .setTitle("**UNBAN**")
    .setThumbnail(userAvatar)
    .setColor("RANDOM")
    .setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
    .setTimestamp()
    .setFooter(guild.name, guild.iconURL());
   logChannel.send(unBanInfo);
 });
} catch (err) {
 let embed = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setTitle("Error!")
  .setDescription("**Error Code:** *" + err + "*")
  .setTimestamp();
 return logChannel.send(embed);
}
}
*/