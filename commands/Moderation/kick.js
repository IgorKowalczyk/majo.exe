

const Discord = module.require("discord.js");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "kick",
 aliases: ["kickar", "expulsar"],
 description: "Kicka um membro",
 category: "Moderação",
 usage: "kick <mention> <reason>",
 run: async (client, message, args) => {
  try {
   if (message.member.hasPermission("KICK_MEMBERS")) {
    let mentioned = await message.mentions.members.first();
    let reason = await args.slice(1).join(' ');
    if (!mentioned) {
     return await message.channel.send({embed: {
      color: 16734039,
      description: "Mencione um membro válido!"
     }})
    }
    if (!mentioned.kickable) {
     return await message.channel.send({embed: {
      color: 16734039,
      description: "Você não pode kickar este membro!"
     }})  
    }
    if (message.author === mentioned) {
     return await message.channel.send({embed: {
      color: 16734039,
      description: "Você não pode se kickar!"
     }})
    }
    if (!reason) {
     reason = "Nenhum motivo fornecido!";
    }
    message.guild.members.kick(mentioned, { reason: reason });
    const ban = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(":white_check_mark: Sucesso!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setDescription(":no_entry: " + mentioned.displayName + " foi kickado!")
     .setTimestamp()
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    message.channel.send(ban);
   } 
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}