const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
  var embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setColor("3498db")
    .setImage(message.guild.iconURL)
    .setTimestamp()

  await message.channel.send(embed=embed);
}

module.exports.help = {
    name: "servericon",
    description: "Grabs the server icon",
    usage: "servericon",
    type: "Utility"
}