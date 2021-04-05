const Discord = require("discord.js");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "flipcoin",
 aliases: [],
 description: "Virar uma moeda virtual",
 category: "Diversão",
 usage: "flipcoin",
 run: async (client, message, args) => {
  try {
   const answers = ["Cara", "Coroa"]
   const answer = answers[Math.floor(Math.random()*answers.length)];
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Consegui: ${answer}`)
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setTimestamp()
   message.channel.send(embed);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}
