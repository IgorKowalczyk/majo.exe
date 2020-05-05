const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
  let serverowner = message.guild.member(message.guild.ownerID);
  var roles = [];
  
  var embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setColor("RANDOM")
    .setThumbnail(message.guild.iconURL)
    .addField("Server Owner", "@" + ${serverowner.id}, true)
    .addField("Members", message.guild.memberCount, true)
    .addField("Server Region", message.guild.region, true)
    .addField("Roles", message.guild.roles.filter(r => r.id !== message.guild.id).map(roles => roles.name).join(", ") || "No Roles", true)    
    .setTimestamp()
    // .setFooter("Server owned by: " + serverowner)
  
  await message.channel.send(embed=embed);
}

module.exports.help = {
    name: "serverinfo",
    description: "Grabs the server info",
    usage: "serverinfo",
    type: "Utility"
}