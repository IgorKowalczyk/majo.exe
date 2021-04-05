const Discord = require('discord.js');
const config = require("../../config");

module.exports = async (client, oldRole, newRole) => {
/*
try {
 if (!oldRole.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
 if (!oldRole.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))return;
 var logChannel = oldRole.guild.channels.cache.find(c => c.name === "log");
 if (!logChannel) return;
 oldRole.guild.fetchAuditLogs().then(logs => {
  var userID = logs.entries.first().executor.id;
  var userAvatar = logs.entries.first().executor.avatarURL();
  if (oldRole.name !== newRole.name) {
   let roleUpdateName = new Discord.MessageEmbed()
    .setTitle("**ROLE NAME UPDATE**")
    .setThumbnail(userAvatar)
    .setColor("RANDOM")
    .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
    .setTimestamp()
    .setFooter(oldRole.guild.name, oldRole.guild.iconURL());
   logChannel.send(roleUpdateName);
  }
  if (oldRole.hexColor !== newRole.hexColor) {
   if (oldRole.hexColor === "#000000") {
    var oldColor = "`Default`";
   } else {
    var oldColor = oldRole.hexColor;
   }
   if (newRole.hexColor === "#000000") {
    var newColor = "`Default`";
   } else {
    var newColor = newRole.hexColor;
   }
   let roleUpdateColor = new Discord.MessageEmbed()
    .setTitle("**ROLE COLOR UPDATE**")
    .setThumbnail(userAvatar)
    .setColor("RANDOM")
    .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
    .setTimestamp()
    .setFooter(oldRole.guild.name, oldRole.guild.iconURL());
   logChannel.send(roleUpdateColor);
  }
  if (oldRole.permissions !== newRole.permissions) {
   let roleUpdate = new Discord.MessageEmbed()
   .setTitle("**UPDATE ROLE PERMISSIONS**")
   .setThumbnail(userAvatar)
   .setColor("RANDOM")
   .setDescription(`**\n**:first_place: Successfully \`\`CHANGED\`\` **${oldRole.name}** Permissions!\n\n**Old Permissions:** \`\`${oldRole.permissions.toArray()}\`\`\n**New Permissions:** \`\`${newRole.permissions.toArray()}\`\`\n**By:** <@${userID}> (ID: ${userID})`)
   .setTimestamp()
   .setFooter(oldRole.guild.name, oldRole.guild.iconURL());
  logChannel.send(roleUpdate);
  }
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
