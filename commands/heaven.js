const Discord = require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "heaven",
 aliases: ["hvn"],
 description: "Returns a heaven image",
 category: "Image",
 usage: "heaven [user mention]",
 run: async (client, message, args) => {
  try {
   const hmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage(encodeURI(`https://vacefron.nl/api/heaven?user=${hmember.user.displayAvatarURL({ format: "png" })}`))
    .setTimestamp();
   return message.channel.send(embed);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
