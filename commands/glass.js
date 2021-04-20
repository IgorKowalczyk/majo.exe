const Discord = require("discord.js");
const Random = require("srod-v2");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "glass",
 aliases: [],
 description: "Returns a glass image",
 category: "Fun",
 usage: "glass [user mention]",
 run: async (client, message, args) => {
  try {
   const amember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
   const embed = await Random.Glass({ Image: amember.user.displayAvatarURL({ format: "png" }), Color: "RANDOM" });
   return message.channel.send(embed);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
