const Discord = module.require("discord.js");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "dice",
 aliases: [],
 description: "Rolar um dado",
 category: "Diversão",
 usage: "dice",
 run: async (client, message, args) => {
  try {
   const answers = ["1", "2", "3", "4", "5", "6"]
   const dice =  answers[Math.floor(Math.random()*answers.length)];
   const embed = new Discord.MessageEmbed()
    .setDescription(":game_die: Os dados rolaram " + `${dice}` + "! :game_die:")
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   message.channel.send(embed=embed);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}