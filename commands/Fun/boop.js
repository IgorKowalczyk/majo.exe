const Discord = require("discord.js");

module.exports = {
 name: "boop",
 aliases: [],
 description: "Boop-Beep!",
 category: "Fun",
 usage: "boop",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle("⏰ Beep!")
   message.channel.send(embed);
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
