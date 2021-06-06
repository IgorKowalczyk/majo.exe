const Discord = require("discord.js")

module.exports = {
 name: "beep",
 aliases: [],
 description: "Beep-Boop!",
 category: "Fun",
 usage: "beep",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed().setColor("RANDOM").setTitle("⏰ Boop!")
   message.lineReply(embed)
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
