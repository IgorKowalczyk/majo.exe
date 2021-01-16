const Discord = require('discord.js');
const config = require("../../config");

module.exports = async (client, message) => {
 try {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
  const log = message.guild.channels.cache.find(log => log.name === "log")
  if(!log) return;
  if(log.type !== "text") return;
  if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
  if(log) {
   const final = message.toString().substr(0, 500); // Limit characters
   const event = new Discord.MessageEmbed()
    .setTitle(`Message Deleted`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL())
    .addField("Channel", `<#${message.channel.id}> (ID: ${message.channel.id})`)
    .addField("Message ID", `${message.id}`)
    .addField("Created at", `${message.createdAt}`)
    .addField("TTS", `${message.tts}`)
    .addField("Pinned", `${message.pinned}`)
    .addField("Send By", `<@${message.author.id}> (ID: ${message.author.id})`)
    .addField("Message", "\`\`\`" + `${final}` + "\`\`\`")
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL())
   log.send(event)
  }
 } catch (err) {
  console.log(err);
 }
}
