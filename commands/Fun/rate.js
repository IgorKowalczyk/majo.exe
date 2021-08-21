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
     description: `${client.bot_emojis.error} | Please enter a text!\n\n**Usage:** \`${process.env.PREFIX} rate <text>\``,
    },
   });
  if (rate.length > 30)
   return message.lineReply({
    embed: {
     color: 16734039,
     title: `${client.bot_emojis.error} | I can't rate that. Max text length is 30!`,
    },
   });
  let result = Math.floor(Math.random() * 100 + 0);
  const happyrate = new Discord.MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** ${result}/100 ?`)
   .setColor(`GREEN`)
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  const sadembed = new Discord.MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** ${result}/100 ??`)
   .setColor(`RED`)
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  const idkembed = new Discord.MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** ${result}/100 ??`)
   .setColor(`YELLOW`)
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  const shrugembed = new Discord.MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** ${result}/100 ??`)
   .setColor(`YELLOW`)
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  const okembed = new Discord.MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** ${result}/100 ??`)
   .setColor(`GREEN`)
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  const thumbupembed = new Discord.MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** ${result}/100 ??`)
   .setColor(`GREEN`)
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  const eyesembed = new Discord.MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** ${result}/100 ??`)
   .setColor(`GREEN`)
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  if (result > 90) return message.lineReply(happyrate);
  if (result < 30) return message.lineReply(sadembed);
  if (result > 40) return message.lineReply(idkembed);
  if (result > 50) return message.lineReply(shrugembed);
  if (result > 60) return message.lineReply(okembed);
  if (result > 70) return message.lineReply(thumbupembed);
  if (result > 80) return message.lineReply(eyesembed);
 },
};
