var figlet = require('figlet');
const Discord = require('discord.js')
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "ascii",
 aliases: ["asciiart", "ascii-art"],
 category: "Diversão",
 description: "Converter texto para o formato ASCII",
 usage: "ascii <text>",
 run: async (client, message, args) => {
  try {
   var max = 50;
   if(args.join(' ').length > max) return message.channel.send({embed: {
    color: 16734039,
    description: "O comprimento máximo é " + `${max}` + " !"
   }})
   if(!args[0]) return message.channel.send({embed: {
    color: 16734039,
    description: "Por favor, insira um texto para converter!"
   }})
   figlet(`${args.join(' ')}`, function(err, data) {
    if (err) {
     return message.channel.send({embed: {
      color: 16734039,
      description: "Algo deu errado... :cry:"
     }})
    }
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(":white_check_mark: Success!", message.guild.iconURL({ dynamic: true, format: 'png'}))
    .setDescription(":tada: Seu código ASCII foi gerado! Você pode ver abaixo")
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    .setTimestamp()
   message.channel.send(embed)
   message.channel.send(`${data}`, {code: 'AsciiArt'});
   });
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}
