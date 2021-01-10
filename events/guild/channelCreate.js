const Discord = require('discord.js');

module.exports = async (client, channel) => {
 try {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  const log = message.guild.channels.cache.find(log => log.name === "log")
  if(!log) return;
  if (channel.type === "text") {
   var type = "Text";
  } else if (channel.type === "voice") {
   var type = "Voice";
  } else if (channel.type === "category") {
   var type = "Category";
  }
  channel.guild.fetchAuditLogs().then(logs => {
   var userid = logs.entries.first().executor.id;
   var uavatar = logs.entries.first().executor.avatarURL();
   let event = new Discord.MessageEmbed()
    .setTitle("Channel Created")
    .setThumbnail(uavatar)
    .addField("Channel name", `<#${channel.id}> (ID: ${channel.id})`)
    .addField("Channel type", `${type}`)
    .addField("Channel type", `${type}`)
    .addField("Created by", `<@${userid}> (ID: ${userid})`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(channel.guild.name, channel.guild.iconURL());
   log.send(event);
  });
 } catch (err) {
  const embed = new Discord.MessageEmbed()
   .setColor("#FF0000")
   .setTitle("I meet error!")
   .setDescription("Error Code: \`\`\`" + err + "\`\`\`")
   .setTimestamp()
  return log.send(embed);
 }
}
