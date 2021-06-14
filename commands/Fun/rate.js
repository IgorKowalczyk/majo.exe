const Discord = require("discord.js");

module.exports = {
 name: "rate",
 aliases: [],
 description: "Rate your thing",
 category: "Fun",
 usage: "rate <text>",
 run: async (client, message, args) => {
  let rate = args.join(" ");
  if (!rate)
   return message.lineReply({
    embed: {
     color: 16734039,
     description: "❌ | Please enter a text!",
    },
   });
  if (rate.length > 30)
   return message.lineReply({
    embed: {
     color: 16734039,
     title: "❌ | I can't rate that. Max text length is 30!",
    },
   });
  let result = Math.floor(Math.random() * 100 + 0);
  const happyrate = new Discord.MessageEmbed() // Prettier()
   .setDescription(`✨ | I would rate **${rate}** ${result}/100 ?`)
   .setColor(`GREEN`);
  const sadembed = new Discord.MessageEmbed() // Prettier()
   .setDescription(`✨ | I would rate **${rate}** ${result}/100 ??`)
   .setColor(`RED`);
  const idkembed = new Discord.MessageEmbed() // Prettier()
   .setDescription(`✨ | I would rate **${rate}** ${result}/100 ??`)
   .setColor(`YELLOW`);
  const shrugembed = new Discord.MessageEmbed() // Prettier()
   .setDescription(`✨ | I would rate **${rate}** ${result}/100 ??`)
   .setColor(`YELLOW`);
  const okembed = new Discord.MessageEmbed() // Prettier()
   .setDescription(`✨ | I would rate **${rate}** ${result}/100 ??`)
   .setColor(`GREEN`);
  const thumbupembed = new Discord.MessageEmbed() // Prettier()
   .setDescription(`✨ | I would rate **${rate}** ${result}/100 ??`)
   .setColor(`GREEN`);
  const eyesembed = new Discord.MessageEmbed() // Prettier()
   .setDescription(`✨ | I would rate **${rate}** ${result}/100 ??`)
   .setColor(`GREEN`);
  if (result > 90) return message.lineReply(happyrate);
  if (result < 30) return message.lineReply(sadembed);
  if (result > 40) return message.lineReply(idkembed);
  if (result > 50) return message.lineReply(shrugembed);
  if (result > 60) return message.lineReply(okembed);
  if (result > 70) return message.lineReply(thumbupembed);
  if (result > 80) return message.lineReply(eyesembed);
 },
};
