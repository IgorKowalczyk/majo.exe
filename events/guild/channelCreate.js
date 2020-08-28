  const Discord = require('discord.js');

module.exports = async (client, channel) => {
try {
 if (!channel.guild) return;
 if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
 if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
 var logChannel = channel.guild.channels.cache.find(c => c.name === "log");
 if (!logChannel) return;
 if (channel.type === "text") {
  var roomType = "Text";
 } else if (channel.type === "voice") {
  var roomType = "Voice";
 } else if (channel.type === "category") {
  var roomType = "Category";
 }
 channel.guild.fetchAuditLogs().then(logs => {
  var userID = logs.entries.first().executor.id;
  var userAvatar = logs.entries.first().executor.avatarURL();
  let channelCreate = new Discord.MessageEmbed()
   .setTitle("**CHANNEL CREATE**")
   .setThumbnail(userAvatar)
   .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
   .setColor("RANDOM")
   .setTimestamp()
   .setFooter(channel.guild.name, channel.guild.iconURL());
  logChannel.send(channelCreate);
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
