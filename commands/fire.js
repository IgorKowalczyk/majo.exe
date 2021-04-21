const Discord = require('discord.js')
const config = require("../config");
const prefix = config.prefix;
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(process.env.AMEAPI);

module.exports = {
 name: "fire",
 aliases: ["burn"],
 description: "Burns the users avatar",
 category: "Image",
 usage: "fire [user]",
 run: async (client, message, args) => {
  let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.member;
  let buffer = await AmeAPI.generate("fire", {
   url: User.user.displayAvatarURL({
    format: "png",
    size: 2048
   })
  });
  let attachment = new Discord.MessageAttachment(buffer, "burn.png");
  message.channel.send(attachment);
 }
}
