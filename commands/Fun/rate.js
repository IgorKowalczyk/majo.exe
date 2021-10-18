const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "rate",
 aliases: [],
 description: "Rate your thing",
 category: "Fun",
 usage: "rate <text>",
 run: async (client, message, args) => {
  let rate = args.join(" ");
  if (!rate) {
   return client.createError(message, `${client.bot_emojis.error} | Please enter a text!\n\n**Usage:** \`${client.prefix} rate <text>\``);
  }
  if (args.toString().length > client.max_input) {
   return client.createError(message, `${client.bot_emojis.error} | Question can't be longer than \`${client.max_input}\` characters!\n\n**Usage:** \`${client.prefix} rate <text>\``);
  }
  let result = Math.floor(Math.random() * 100 + 0);
  const happyrate = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ?`)
   .setColor("GREEN")
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  const sadembed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ??`)
   .setColor("RED")
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  const idkembed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ??`)
   .setColor("YELLOW")
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  const shrugembed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ??`)
   .setColor("YELLOW")
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  const okembed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ??`)
   .setColor("GREEN")
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  const thumbupembed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ??`)
   .setColor("GREEN")
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  const eyesembed = new MessageEmbed() // Prettier
   .setDescription(`${client.bot_emojis.sparkles} | I would rate **${rate}** \`${result}/100\` ??`)
   .setColor("GREEN")
   .setFooter(
    `Requested by ${message.author.username}`,
    message.author.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    })
   )
   .setTimestamp();
  if (result > 90) return message.reply({ embeds: [happyrate] });
  if (result < 30) return message.reply({ embeds: [sadembed] });
  if (result > 40) return message.reply({ embeds: [idkembed] });
  if (result > 50) return message.reply({ embeds: [shrugembed] });
  if (result > 60) return message.reply({ embeds: [okembed] });
  if (result > 70) return message.reply({ embeds: [thumbupembed] });
  if (result > 80) return message.reply({ embeds: [eyesembed] });
 },
};
