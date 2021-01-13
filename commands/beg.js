const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "beg",
 aliases: [],
 description: "Beg money",
 category: "Economy",
 usage: "beg",
 run: async (client, message, args) => {
  try {
   const user = message.author;
   const timeout = 180000;
   const amount = 100;
   let beg = await db.fetch(`beg_${message.guild.id}_${user.id}`);
   if (beg !== null && timeout - (Date.now() - beg) > 0) {
    const errtime = ms(timeout - (Date.now() - beg));
    const time = new Discord.MessageEmbed()
     .setTitle("Error!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor("FF5757")
     .setDescription(`You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s`)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    message.channel.send(errtime)
   } else {
    const money = new Discord.MessageEmbed()
     .setTitle("Succes!", message.guild.iconURL({ dynamic: true, format: 'png'}))
     .setColor("RANDOM")
     .setDescription(`:white_check_mark:  You've begged and received ${amount} coins`)
     .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }))
    message.channel.send(money)
    db.add(`money_${message.guild.id}_${user.id}`, amount)
    db.set(`beg_${message.guild.id}_${user.id}`, Date.now())
   }
  } catch (err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
