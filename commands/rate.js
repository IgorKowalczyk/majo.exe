const Discord = module.require("discord.js");
const config = require("../config");
const prefix = config.prefix;

module.exports = {
 name: "prune",
 aliases: [],
 description: "Rate your thing",
 category: "Fun",
 usage: "rate <text>",
 run: async (client, message, args) => {
  let rate = args.join(" ");
  if (!rate) return  message.channel.send({embed: {
   color: 16734039,
   description: "Please enter a text!"
  }})
  if (rate.length > 30) return  message.channel.send({embed: {
   color: 16734039,
   title: "I can't rate that. Max text length is 30!"
   }})
  let result = Math.floor((Math.random() * 100) + 0);
  const happyrate = new Discord.MessageEmbed()
   .setDescription(`I would rate **${rate}** ${result}/100 ?`)
   .setColor(`GREEN`)
  const sadembed = new Discord.MessageEmbed()
   .setDescription(`I would rate **${rate}** ${result}/100 ??`)
   .setColor(`RED`)
  const idkembed = new Discord.MessageEmbed()
   .setDescription(`I would rate **${rate}** ${result}/100 ??`)
   .setColor(`RED`)
  const shrugembed = new Discord.MessageEmbed()
   .setDescription(`I would rate **${rate}** ${result}/100 ??`)
   .setColor(`YELLOW`)
  const okembed = new Discord.MessageEmbed()
   .setDescription(`I would rate **${rate}** ${result}/100 ??`)
   .setColor(`GREEN`)
  const thumbupembed = new Discord.MessageEmbed()
   .setDescription(`I would rate **${rate}** ${result}/100 ??`)
   .setColor(`GREEN`)
  const eyesembed = new Discord.MessageEmbed()
  .setDescription(`I would rate **${rate}** ${result}/100 ??`)
  .setColor(`GREEN`)
  if (result > 90) return message.channel.send(happyrate)
  if (result < 30) return message.channel.send(sadembed)
  if (result > 40) return message.channel.send(idkembed)
  if (result > 50) return message.channel.send(shrugembed)
  if (result > 60) return message.channel.send(okembed)
  if (result > 70) return message.channel.send(thumbupembed)
  if (result > 80) return message.channel.send(eyesembed)
 } 
}
