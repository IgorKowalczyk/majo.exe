const Discord = require('discord.js')
const canvacord = require("canvacord");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "trigerred",
 aliases: ["tgd"],
 description: "Returns a triggered image",
 category: "Image",
 usage: "trigerred [user mention]",
 run: async (client, message, args) => {
  try {
   let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.member;
   let triggered = await canvacord.trigger(User.displayAvatarURL({ format: "png", dynamic: false }));
   let attachment = new MessageAttachment(triggered, "triggered.gif");
   return message.channel.send(attachment);
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
