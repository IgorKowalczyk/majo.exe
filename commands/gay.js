const Discord = require("discord.js");
const Random = require("srod-v2");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "gay",
 aliases: [],
 description: "Returns a gay image",
 category: "Image",
 usage: "gay [user mention]",
 run: async (client, message, args) => {
  try {
   const gmember = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.member;
   const embed = await Random.Gay({ Image: gmember.user.displayAvatarURL({ format: "png" }), Color: "RANDOM" });
   return message.channel.send(embed);
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
