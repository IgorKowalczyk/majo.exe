const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "addmoney",
 aliases: [],
 description: "Give money to mentioned user",
 category: "Economy",
 usage: "addmoney <user> <money>",
 run: async (client, message, args) => {
  try {
   if (message.member.hasPermission("MANAGE_MESSAGES")) {
    let user = message.mentions.members.first();
    if (!user) return message.channel.send({embed: {
     color: 16734039,
     description: "You must mention someone to add money!"
    }})
    if (isNaN(args[1])) return message.channel.send({embed: {
     color: 16734039,
     description: "You must enter the amount of money to add!"
    }})
    const negative = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription(`You can't deposit negative money`);
    if (message.content.includes('-')) { 
     return message.channel.send(negative).catch(err => console.log(err))
    }
    db.add(`money_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let moneyEmbed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(":white_check_mark: Success!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setDescription(`:money_with_wings: Added \`${args[1]}\` coins\n:moneybag: New Balance: \`${bal}\``)
     .setTimestamp()
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
     message.channel.send(moneyEmbed)
   } else {
    message.channel.send({embed: {
     color: 16734039,
     description: "You don't have premission add money!"
    }})
   }
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
