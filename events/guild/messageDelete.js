const Discord = require('discord.js');
const prefix = process.env.PREFIX;

module.exports = async (client, message) => {
 try {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;  
  if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;  
  if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;  
  const log = client.channels.cache.find(log => log.name === "log")
  if(!log) return;
  const final = message.toString().substr(0, 500); // Limit characters
  const event = new Discord.MessageEmbed()  
   .setTitle(`Message Deleted in ${message.channel}`)
   .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL())
   .addField("Channel", `${message.channel.name} (ID: ${message.channel.id})`)
   .addField("Message ID", `(${message.id})`)
   .addField("Send By", `<@${message.author.id}> (ID: ${message.author.id})`)
   .addField("Message", "\`\`\`" + `${final}` + "`\`\`\`")
   .setTimestamp()
   .setFooter(message.guild.name, message.guild.iconURL())
   console.log(log.id);
   console.log(final);
  log.send(event)
 } catch (err) {
  const embed = new Discord.MessageEmbed()
   .setColor("#FF0000")
   .setTitle("I meet error!")
   .setDescription("Error Code: \`\`\`" + err + "\`\`\`")
   .setTimestamp()
  return log.send(embed);
 }
}
