const Discord = require('discord.js');
const prefix = process.env.PREFIX;

module.exports = async (client, message) => {
try {
 if(message.author.bot) return;
 if(message.channel.type === 'dm') return;  
 if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;  
 if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;  
 var logChannel = message.guild.channels.cache.find(c => c.name === 'log');  
 if(!logChannel) return;  
 let messageDelete = new Discord.MessageEmbed()  
  .setTitle('**MESSAGE DELETE**')  
  .setColor('RANDOM')  
  .setThumbnail(message.author.avatarURL())  
  .setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
  .setTimestamp()  
  .setFooter(message.guild.name, message.guild.iconURL())  
 logChannel.send(messageDelete);
} catch (err) {
 let embed = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setTitle("Error!")
  .setDescription("**Error Code:** *" + err + "*")
  .setTimestamp()
 return logChannel.send(embed);
}
}
