const Discord = require('discord.js')
const canvacord = require("canvacord");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "affect",
 aliases: [],
 description: "No, it doesn't affect my baby",
 category: "Image",
 usage: "affect [user mention, user id, user name]",
 run: async (client, message, args) => {
  try {
   const User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.member;
   const wait = await message.channel.send({embed: {
    color: 4779354,
    description: "Please wait... I'm generating your image",
   }})
   const affect = await canvacord.Canvas.affect(User.user.displayAvatarURL({ dynamic: false, format: 'png', size: 2048 }));
   const attachment = new Discord.MessageAttachment(affect, "affect.png");
   const embed = new Discord.MessageEmbed()
   .setColor("RANDOM")
   .setAuthor("🖼️ Your image", User.user.displayAvatarURL({ dynamic: false, format: 'png', size: 2048 }))
   .setImage(encodeURIComponent(affect))
   .setTimestamp()
   .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   return message.channel.send(embed);
  } catch (err) {
   console.log(err);
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
