const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "members",
 aliases: ["users"],
 description: "How many members are in the current server",
 category: "Utility",
 usage: "members",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed()
    .setAuthor("Total members", message.guild.iconURL)
    .setColor("RANDOM")
    .addField("Overall Members: ", message.guild.memberCount)
    .setTimestamp()
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   message.channel.send(embed);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
