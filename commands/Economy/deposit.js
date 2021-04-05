const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const config = require("../../config");
const prefix = config.prefix;

module.exports = {
 name: "deposit",
 aliases: ["dep"],
 description: "Depósito de sonhos para banco",
 category: "Economia",
 usage: "deposit <all/monety>",
 run: async (client, message, args) => {
  try {
   let user = message.author;
   let member = db.fetch(`money_${message.guild.id}_${user.id}`)
   let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)
   if(isNaN(args[0])) {
    return message.channel.send({embed: {
     color: 16734039,
     description: "Você deve fornecer um número para depositar o dinheiro!"
    }})
   }
   if (args[0] == "all") {
    let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
    let embedbank = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription("Você não tem dinheiro para depositar")
    if(money === 0) return message.channel.send(embedbank)
    db.add(`bank_${message.guild.id}_${user.id}`, money)
    db.subtract(`money_${message.guild.id}_${user.id}`, money)
    const allmoney = new Discord.RichEmbed()
     .setColor("RANDOM")
     .setDescription(`:white_check_mark: Você depositou todas as suas moedas em seu banco`);
    message.channel.send(allmoney).catch(err => console.log(err))
   } else {
    const setmoney = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription(`Especifique um valor para depositar`);
    if (!args[0]) {
     return message.channel.send(setmoney).catch(err => console.log(err))
    }
    const negative = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription(`Você não pode depositar dinheiro negativo`);
    if (message.content.includes('-')) { 
     return message.channel.send(negative).catch(err => console.log(err))
    }
    const nomoney = new Discord.MessageEmbed()
     .setColor("FF5757")
     .setDescription(`Você não tem muito dinheiro`);
    if (member < args[0]) {
     return message.channel.send(nomoney).catch(err => console.log(err))
   }
   const success = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`:white_check_mark: Você depositou ${args[0]} sonhos em seu banco`);
   message.channel.send(success);
   db.add(`bank_${message.guild.id}_${user.id}`, args[0]);
   db.subtract(`money_${message.guild.id}_${user.id}`, args[0]);
   }
  } catch(err) {
   message.channel.send({embed: {
    color: 16734039,
    description: "Algo deu errado... :cry:"
   }})
  }
 }
}
