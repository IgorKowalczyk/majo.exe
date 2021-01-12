const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "deposit",
 aliases: ["dep"],
 description: "Deposit money to bank",
 category: "Economy",
 usage: "deposit <all/monety>",
 run: async (client, message, args) => {
  try {
   let user = message.author;
   let member = db.fetch(`money_${message.guild.id}_${user.id}`)
   let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)
   if(isNaN(args[0])) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "You must provide a number to deposit money!"
    }})
   }
   if (args[0] == "all") {
    let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
    let embedbank = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription("You don't have any money to deposit")
    if(money === 0) return message.channel.send(embedbank)
    db.add(`bank_${message.guild.id}_${user.id}`, money)
    db.subtract(`money_${message.guild.id}_${user.id}`, money)
    const allmoney = new Discord.RichEmbed()
     .setColor("RANDOM")
     .setDescription(`:white_check_mark: You have deposited all your coins into your bank`);
    message.channel.send(allmoney).catch(err => console.log(err))
   } else {
    const setmoney = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription(`Specify an amount to deposit`);
    if (!args[0]) {
     return message.channel.send(setmoney).catch(err => console.log(err))
    }
    const negative = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription(`You can't deposit negative money`);
    if (message.content.includes('-')) { 
     return message.channel.send(negative).catch(err => console.log(err))
    }
    const nomoney = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription(`You don't have that much money`);
    if (member < args[0]) {
     return message.channel.send(nomoney).catch(err => console.log(err))
   }
   const success = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`:white_check_mark: You have deposited ${args[0]} coins into your bank`);
   message.channel.send(success);
   db.add(`bank_${message.guild.id}_${user.id}`, args[0]);
   db.subtract(`money_${message.guild.id}_${user.id}`, args[0]);
   }
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Something went wrong... :cry:"
   }})
  }
 }
}
