const Discord = require("discord.js")
const config = require("../../config")

module.exports = {
 name: "dashboard",
 aliases: [],
 description: "Provide link to the web-dashboard",
 category: "General",
 usage: "dashboard",
 run: async (client, message, args) => {
  try {
   if (!config.domain) {
    const embed = new Discord.MessageEmbed()
     .setTitle("<a:error:759354037803024395> Mheh!")
     .setDescription("Our dashboard is not working at the moment, please try again later!")
     .setTimestamp()
     .setColor("RANDOM")
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    return message.lineReply(embed)
   }
   if (message.member.hasPermission("MANAGE_GUILD")) {
    const embed = new Discord.MessageEmbed()
     .setTitle("<a:sucess:759354039242063903> Yay!")
     .setDescription("🔗 Your server link: " + config.domain + "/dashboard/" + message.guild.id + "\n🔗 Dashboard link: " + config.domain)
     .setTimestamp()
     .setColor("RANDOM")
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    message.lineReply(embed)
   } else {
    const embed = new Discord.MessageEmbed()
     .setTitle("<a:sucess:759354039242063903> Yay!")
     .setDescription("🔗 Our dashboard link: " + config.domain)
     .setTimestamp()
     .setColor("RANDOM")
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    message.lineReply(embed)
   }
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   })
  }
 },
}
