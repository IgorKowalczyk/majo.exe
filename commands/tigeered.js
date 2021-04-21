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
   const User = await message.mentions.members.first() || message.member;
   const triggered = await canvacord.trigger(User.displayAvatarURL({ dynamic: false, format: 'png', size: 2048 }));
   const attachment = new MessageAttachment(triggered, "triggered.gif");
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
