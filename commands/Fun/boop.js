const Discord = require("discord.js");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "boop",
 aliases: [],
 description: "Boop-Beep!",
 category: "Diversão",
 usage: "boop",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription("Beep!")
   message.channel.send(embed);
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}
