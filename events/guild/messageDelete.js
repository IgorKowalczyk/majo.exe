const Discord = require('discord.js');
const prefix = process.env.PREFIX;

module.exports = async (client, message) => {
 try {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;  
  if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;  
  if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;  
  const log = message.guild.channels.cache.find(log => log.name === "log")
  if(!log) return;
  const final = message.toString().substr(0, 500); // Limit characters
  const event = new Discord.MessageEmbed()  
   .setTitle(`Message Deleted`)
   .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL())
   .addField("Channel", `<#${message.channel.id}> (ID: ${message.channel.id})`)
   .addField("Message ID", `${message.id}`)
   .addField("Created at", `${message.createdAt}`)
   .addField("Deleted at", `${message.deleted}`)
   .addField("TTS", `${message.tts}`)
   .addField("Send By", `<@${message.author.id}> (ID: ${message.author.id})`)
   .addField("Message", "\`\`\`" + `${final}` + "\`\`\`")
   .setTimestamp()
   .setFooter(message.guild.name, message.guild.iconURL())
  log.send(event)
 } catch (err) {
  console.log(err);
 }
}
