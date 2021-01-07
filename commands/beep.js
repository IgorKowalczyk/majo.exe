const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "beep",
 aliases: [],
 description: "Beep-Boop!",
 category: "Fun",
 usage: "beep",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription("Boop!")
   message.channel.send(embed);
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
