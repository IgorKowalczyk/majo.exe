const Discord = require("discord.js");
const Random = require("srod-v2");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "awooify",
 aliases: [],
 description: "Returns a awooify image",
 category: "Image",
 usage: "awooify [user mention]",
 run: async (client, message, args) => {
  try {
   const amember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
   const wait = await message.channel.send({embed: {
    color: 4779354,
    description: "Please wait... I'm generating your image",
    footer: "This message will be deleted in 5 secounds"
   }})
   const embed = await Random.Awooify({ Image: amember.user.displayAvatarURL({ format: "png" }), Color: "RANDOM" });
   message.channel.send(embed);
   wait.delete({
    timeout: 5000
   });
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
