const Discord = require('discord.js');
const config = require("../../config");

module.exports = async (client, role) => {
/*
try {
 if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
 if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
 var logChannel = role.guild.channels.cache.find(c => c.name === "log");
 if (!logChannel) return;
 role.guild.fetchAuditLogs().then(logs => {
  var userID = logs.entries.first().executor.id;
  var userAvatar = logs.entries.first().executor.avatarURL();
  let roleDelete = new Discord.MessageEmbed()
   .setTitle("**ROLE DELETE**")
   .setThumbnail(userAvatar)
   .setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
   .setColor("RANDOM")
   .setTimestamp()
   .setFooter(role.guild.name, role.guild.iconURL());
  logChannel.send(roleDelete);
 });
} catch (err) {
 let embed = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setTitle("Error!")
  .setDescription("**Error Code:** *" + err + "*")
  .setTimestamp();
 return logChannel.send(embed);
}
*/
}
