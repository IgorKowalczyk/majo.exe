const Discord = require("discord.js");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "members",
 aliases: ["users"],
 description: "Quantos membros estão no servidor atual",
 category: "Utilidades",
 usage: "members",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed()
    .setAuthor("Total de Membros", message.guild.iconURL)
    .setColor("RANDOM")
    .addField("Membros gerais: ", message.guild.memberCount)
    .setTimestamp()
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   message.channel.send(embed);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}
