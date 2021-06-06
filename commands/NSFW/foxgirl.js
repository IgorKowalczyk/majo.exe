const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
 name: "foxgirl",
 aliases: [],
 description: "Display a random foxgirl image/gif",
 category: "NSFW",
 usage: "foxgirl",
 run: async (client, message, args) => {
  if (!message.channel.nsfw) {
   return message.channel.send({
    embed: {
     color: 16734039,
     description: "💢 | You can use this command only in an NSFW Channel!",
    },
   })
  }
  ;(async () => {
   try {
    const response = await fetch("https://nekos.life/api/v2/img/fox_girl")
    const body = await response.json()
    const embed = new Discord.MessageEmbed()
     .setTitle(":smirk: Foxgirl!", message.guild.iconURL({ dynamic: true, format: "png" }))
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
     .setTimestamp()
     .setURL(body.url)
    message.channel.send(embed)
   } catch (err) {
    message.channel.send({
     embed: {
      color: 16734039,
      description: "Something went wrong... :cry:",
     },
    })
   }
  })()
 },
}
