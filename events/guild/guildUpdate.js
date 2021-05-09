const Discord = require('discord.js');
const config = require("../../config");

module.exports = async (client, oldGuild, newGuild) => {
 try {
  if (!newGuild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
  const log = newGuild.channels.cache.find(log => log.name === "log")
  if(!log) return;
  if(log.type !== "text") return;
  if (!log.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
  if(log) {
   if(oldGuild.name != newGuild.name) {
    const embed = new Discord.MessageEmbed()
     .setTitle("Guild name changed")
     .setThumbnail(uavatar)
     .setColor("RANDOM")
     .addField("Old name", `${oldGuild.name}`)
     .addField("New name", `${newGuild.name}`)
     .setTimestamp()
     .setFooter(newGuild.name, newGuild.iconURL())
    log.send(embed);
   }
   if(oldGuild.owner != newGuild.owner) {
    const embed = new Discord.MessageEmbed()
     .setTitle("Guild owner changed")
     .setThumbnail(uavatar)
     .setColor("RANDOM")
     .addField("Old owner", `${oldGuild.owner}`)
     .addField("New owner", `${newGuild.owner}`)
     .setTimestamp()
     .setFooter(newGuild.name, newGuild.iconURL())
    log.send(embed);  
   }
   if(oldGuild.preferredLocale != newGuild.preferredLocale) {
    const embed = new Discord.MessageEmbed()
     .setTitle("Guild preferred locale changed")
     .setThumbnail(uavatar)
     .setColor("RANDOM")
     .addField("Old preferred locale", `${oldGuild.preferredLocale}`)
     .addField("New preferred locale", `${newGuild.preferredLocale}`)
     .setTimestamp()
     .setFooter(newGuild.name, newGuild.iconURL())
    log.send(embed);  
   }
   if(oldGuild.publicUpdatesChannelID != newGuild.publicUpdatesChannelID) {
    const embed = new Discord.MessageEmbed()
     .setTitle("Guild public updates channel changed")
     .setThumbnail(uavatar)
     .setColor("RANDOM")
     .addField("Old public updates channel", `<#${oldGuild.publicUpdatesChannelID}>`)
     .addField("New public updates channel", `<#${newGuild.publicUpdatesChannelID}>`)
     .setTimestamp()
     .setFooter(newGuild.name, newGuild.iconURL())
    log.send(embed);  
   }
   if(oldGuild.rulesChannelID != newGuild.rulesChannelID) {
    const embed = new Discord.MessageEmbed()
     .setTitle("Guild rules channel changed")
     .setThumbnail(uavatar)
     .setColor("RANDOM")
     .addField("Old rules channel", `<#${oldGuild.rulesChannelID}>`)
     .addField("New rules channel", `<#${newGuild.rulesChannelID}>`)
     .setTimestamp()
     .setFooter(newGuild.name, newGuild.iconURL())
    log.send(embed);  
   }
   if(oldGuild.systemChannelID != newGuild.systemChannelID) {
    const embed = new Discord.MessageEmbed()
     .setTitle("Guild system channel changed")
     .setThumbnail(uavatar)
     .setColor("RANDOM")
     .addField("Old system channel", `<#${oldGuild.systemChannelID}>`)
     .addField("New system channel", `<#${newGuild.systemChannelID}>`)
     .setTimestamp()
     .setFooter(newGuild.name, newGuild.iconURL())
    log.send(embed);  
   }
   if(oldGuild.verificationLevel != newGuild.verificationLevel) {
    const embed = new Discord.MessageEmbed()
     .setTitle("Guild verification level changed")
     .setThumbnail(uavatar)
     .setColor("RANDOM")
     .addField("Old verification level", `${oldGuild.verificationLevel}`)
     .addField("New verification level", `${newGuild.verificationLevel}`)
     .setTimestamp()
     .setFooter(newGuild.name, newGuild.iconURL())
    log.send(embed);  
   }
   if(oldGuild.widgetEnabled != newGuild.widgetEnabled) {
    const embed = new Discord.MessageEmbed()
     .setTitle("Guild widget update")
     .setThumbnail(uavatar)
     .setColor("RANDOM")
     .addField("Old widget channel", `${oldGuild.widgetEnabled}`)
     .addField("New widget channel", `${newGuild.widgetEnabled}`)
     .setTimestamp()
     .setFooter(newGuild.name, newGuild.iconURL())
    log.send(embed);  
   }
   if(oldGuild.widgetChannelID != newGuild.widgetChannelID) {
    const embed = new Discord.MessageEmbed()
     .setTitle("Guild widget channel changed")
     .setThumbnail(uavatar)
     .setColor("RANDOM")
     .addField("Old widget channel", `${oldGuild.widgetChannelID}`)
     .addField("New widget channel", `${newGuild.widgetChannelID}`)
     .setTimestamp()
     .setFooter(newGuild.name, newGuild.iconURL())
    log.send(embed);  
   }
  }
 } catch (err) {
  console.log(err);
 }
}
