const Discord = require("discord.js");
const Random = require("srod-v2");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "trigerred",
 aliases: ["tgd"],
 description: "Returns a triggered image",
 category: "Fun",
 usage: "trigerred [user mention]",
 run: async (client, message, args) => {
  try {
   const tmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
   const Data = await Random.Triggered({ Image: tmember.user.displayAvatarURL({ format: "png" }), Color: "RANDOM" });
   return message.channel.send(Data);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
