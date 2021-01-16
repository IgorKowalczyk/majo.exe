const Discord = require('discord.js');
const config = require("../../config");

module.exports = async (client, channel) => {
 try {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
  const log = channel.guild.channels.cache.find(log => log.name === "log")
  if(!log) return;
  if(log.type !== "text") return;
  if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
  if(log) {
   if (channel.type === "text") {
    var type = "Text";
   } else if (channel.type === "voice") {
    var type = "Voice";
   } else if (channel.type === "category") {
    var type = "Category";
   } else if (channel.type === "news") {
     var type = "News Feed";
   } else if (channel.type === "store") {
     var type = "Store channel";
   } else if (!channel.type) {
     var type = "?";
   }
   channel.guild.fetchAuditLogs().then(logs => {
    const userid = logs.entries.first().executor.id;
    const uavatar = logs.entries.first().executor.avatarURL();
    const event = new Discord.MessageEmbed()
     .setTitle("Channel Created")
     .setThumbnail(uavatar)
     .addField("Channel name", `<#${channel.id}> (ID: ${channel.id})`)
     .addField("Channel type", `${type}`)
     .addField("Created by", `<@${userid}> (ID: ${userid})`)
     .setColor("RANDOM")
     .setTimestamp()
     .setFooter(channel.guild.name, channel.guild.iconURL());
    log.send(event);
   });
  }
 } catch (err) {
  console.log(err);
 }
}
