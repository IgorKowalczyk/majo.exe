const Discord = require("discord.js");
const Random = require("srod-v2");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "wasted",
 aliases: ["wtd"],
 description: "Returns a wasted image",
 category: "Fun",
 usage: "wasted (user mention)",
 run: async (client, message, args) => {
  const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  const Data = await Random.Wasted({ Image: Member.user.displayAvatarURL({ format: "png" }), Color: "RANDOM" });
  return message.channel.send(Data);
 }
}
