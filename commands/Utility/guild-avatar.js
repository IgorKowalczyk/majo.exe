const Discord = require("discord.js");

module.exports = {
 name: "guild-avatar",
 aliases: [],
 description: "Get a guild avatar",
 category: "Utility",
 usage: "guild-avatar",
 run: async (client, message, args) => {
  try {
    const gavatar = message.guild.iconURL({ dynamic: true, format: 'png', size: 2048 });
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setAuthor(message.guild.name + "'s Avatar", gavatar)
     .setImage(gavatar) 
     .setTimestamp()
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    message.channel.send(embed)
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
