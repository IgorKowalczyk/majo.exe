const Discord = module.require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "ban",
 aliases: [],
 description: "Bans a member",
 category: "Economy",
 usage: "ban <mention> <reason>",
 run: async (client, message, args) => {
  if (message.member.hasPermission("BAN_MEMBERS")) {
   let mentioned = await message.mentions.members.first();
   let reason = await args.slice(1).join(' ');
   if (!mentioned) {
    return await message.channel.send({embed: {
     color: 16734039,
     description: ":x: Mention a valid member!"
    }})
   }
   if (!mentioned.bannable) {
    return await message.channel.send({embed: {
     color: 16734039,
     description: ":x: You cannot ban this member!"
    }})  
   }
   if (message.author === mentioned) {
    return await message.channel.send({embed: {
     color: 16734039,
     description: ":x: You can't ban yourself!"
    }})
   }
   if (!reason) {
    reason = "No reason provided!";
   }
   message.guild.members.ban(mentioned, { reason: reason });
   let ban = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(":white_check_mark: Success!", message.guild.iconURL({ dynamic: true, format: 'png'}))
    .setDescription(":no_entry: " + mentioned.displayName + " has been banned! :no_entry:")
    .setTimestamp()
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
   message.channel.send(ban)   
  }
 }
}
