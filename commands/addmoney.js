const Discord = require("discord.js");
const db = require("quick.db");
const pgClient = require('pg').Client;
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
   var pclient = new pgClient({
    connectionString: process.env.DATABASE_URL,
    ssl: {
     rejectUnauthorized: false
    }
   });
   pclient.connect(err => {
    if(err) {
     return message.channel.send({embed: {
      color: 16734039,
      description: "❌ | Cannot connect to database, please try again later"
     }})
    }
   })
   if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    pclient.end();
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You don't have premission add money. You need the \`MANAGE_MESSAGES\` premission!"
    }})
   }
   let user = message.mentions.members.first();
   if (!user) {
    pclient.end();
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You must mention someone to add money!"
    }})
   }
   if (isNaN(args[1])) {
    pclient.end();
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You must enter the amount of money to add!"
    }})
   }
   if (message.content.includes('-')) { 
    pclient.end();
    return message.channel.send({embed: {
     color: 16734039,
     description: "❌ | You can't add negative money! If you want to remove money please check \`${prefix} removemoney\` command."
    }})
   }
   db.add(`money_${message.guild.id}_${user.id}`, args[1])
   let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(":white_check_mark: Success!", message.guild.iconURL({ dynamic: true, format: 'png'}))
    .setDescription(`:money_with_wings: Added \`${args[1]}\` coins\n:moneybag: New Balance: \`${bal}\``)
    .setTimestamp()
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    message.channel.send(embed)
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
