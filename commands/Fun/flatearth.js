const Discord = require("discord.js");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "flatearth",
 aliases: [],
 description: "Mostra por que a terra é plana",
 category: "Diversão",
 usage: "flatearth",
 run: async (client, message, args) => {
  try {
   const attachment = new Discord.Attachment('../lib/img/earth.png', 'idiots.png');
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Se a terra não for plana, explique isso:")
    .setImage('attachment://idiots.png')
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
