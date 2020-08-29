const Discord = require('discord.js');

module.exports = async (client, oldRole, newRole) => {
try {
 var logChannel = oldRole.guild.channels.cache.find(c => c.name === 'log');  
 if (oldRole.permissions !== newRole.permissions) {
  const embed = new Discord.MessageEmbed()
   .setAuthor(`Role changed permissions`)
   .setColor("RANDOM")
   .setFooter(`ID: ${newRole.id}`)
   .setTimestamp()
  const oldPerms = oldRole.serialize();
  const newPerms = newRole.serialize();
  const permUpdated = [];
  for (const [key, element] of Object.entries(oldPerms)) {
   if (newPerms[key] !== element) permUpdated.push(key);
  }
  if (oldRole.permissions > newRole.permissions) {
   embed.setDescription(`**${newRole.toString()} has lost the ${permUpdated.join(", ")} permission**`)
   logchannel.send(embed)
  } else if (oldRole.permissions < newRole.permissions) {
   embed.setDescription(`**${newRole.toString()} has been given the ${permUpdated.join(", ")} permission**`)
   logchannel.send(embed).catch()
  }
 }
} catch (err) {
 let embed = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setTitle("Error!")
  .setDescription("**Error Code:** *" + err + "*")
  .setTimestamp();
 return logChannel.send(embed);
}
}
