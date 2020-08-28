const Discord = require('discord.js');

module.exports = async (client, oldChannel, newChannel) => {
try {
 if (!oldChannel.guild) return;
 var logChannel = oldChannel.guild.channels.cache.find(c => c.name === "log");
 if (!logChannel) return;
 if (oldChannel.type === "text") {
   var channelType = "Text";
 } else if (oldChannel.type === "voice") {
  var channelType = "Voice";
 } else if (oldChannel.type === "category") {
  var channelType = "Category";
 }
 oldChannel.guild.fetchAuditLogs().then(logs => {
  var userID = logs.entries.first().executor.id;
  var userAvatar = logs.entries.first().executor.avatarURL();
  if (oldChannel.name !== newChannel.name) {
   let newName = new Discord.MessageEmbed()
    .setTitle("**CHANNEL EDIT**")
    .setThumbnail(userAvatar)
    .setColor("RANDOM")
    .setDescription(":wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`" + `${oldChannel.name}` + "\`\`\n**New Name:** \`\`" + `${newChannel.name}` + "\`\ `\n**Channel ID:**" + `${oldChannel.id}` + "\n**By:** <@" + `${userID}` +"> (ID: " + `${userID}` + ")")
    .setTimestamp()
    .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL());
   logChannel.send(newName);
  }
  if (oldChannel.topic !== newChannel.topic) {
   let newTopic = new Discord.MessageEmbed()
    .setTitle("**CHANNEL EDIT**")
    .setThumbnail(userAvatar)
    .setColor("RANDOM")
    .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic ||
     "(Not set)"}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic ||
     "(Not set)"}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
    .setTimestamp()
    .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL());
   logChannel.send(newTopic);
  }
 });
} catch (err) {
 let embed = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setTitle("Error!")
  .setDescription("**Error Code:** *" + err + "*")
  .setTimestamp();
 console.log(err);
}
}
