const Discord = require('discord.js');
const config = require("../../config");

module.exports = async (client, oldMessage, newMessage) => {
 try {
  if (oldMessage.author.bot) return;
  if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
  // if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
  const log = oldMessage.guild.channels.cache.find(c => c.name === "log");
  if (!log) return;
  if (oldMessage.content.startsWith("https://")) return;
  if (oldMessage.content.startsWith("http://")) return;
  const event = new Discord.MessageEmbed()
   .setTitle(`Message Edited`)
   .setColor('RANDOM')
   .setThumbnail(oldMessage.author.avatarURL())
   .addField("Channel", `<#${oldMessage.channel.id}> (ID: ${oldMessage.channel.id})`)
   .addField("Message ID", `${oldMessage.id}`)
   .addField("Created at", `${oldMessage.createdAt}`)
   .addField("TTS", `${oldMessage.tts}`)
   .addField("Pinned", `${oldMessage.pinned}`)
   .addField("Send By", `<@${oldMessage.author.id}> (ID: ${oldMessage.author.id})`)
   .addField("Old Message", "\`\`\`" + `${oldMessage}` + "\`\`\`")
   .addField("New Message", "\`\`\`" + `${newMessage}` + "\`\`\`")
   .setTimestamp()
   .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL())
  log.send(event);
 } catch (err) {
  console.log(err);
 }
}
