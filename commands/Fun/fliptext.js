const Discord = require("discord.js");
const flip = require("flip-text");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "fliptext",
 aliases: [],
 description: "Virar um pouco de texto",
 category: "Diversão",
 usage: "fliptext <text>",
 run: async (client, message, args) => {
  try {
   if (!args[0].lenght) return message.channel.send({embed: {
    color: 16734039,
    description: "Você deve fornecer um texto!"
   }})
   const max = 50;
   if (args.lenght > max) return message.channel.send({embed: {
    color: 16734039,
    description: `O comprimento máximo do texto é de ${max} letras!`
   }})
   var flipped = [];
   args.forEach((arg) => {
    flipped.push(flip(arg));
   });
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(":white_check_mark: Successo!")
    .setDescription("Texto invertido: " + flipped.join(" "))
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setTimestamp()
   await message.channel.send(embed);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}
