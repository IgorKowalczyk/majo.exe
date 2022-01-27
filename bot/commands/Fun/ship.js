const { MessageEmbed } = require("discord.js");
const progressbar = require("percentagebar");

module.exports = {
 name: "ship",
 aliases: [],
 description: "Ship users together",
 category: "Fun",
 usage: "ship <user> <user>",
 run: async (client, message, args) => {
  try {
   const user1 = args[0];
   if (!user1) {
    return client.createError(message, `${client.bot_emojis.error} | Please mention a first user to ship!\n\n**Usage:** \`${client.prefix} ship <user> <user>\``);
   }
   const user2 = args[1];
   if (!user2) {
    return client.createError(message, `${client.bot_emojis.error} | Please mention a secound user to ship!\n\n**Usage:** \`${client.prefix} ship <user> <user>\``);
   }
   if (args[0].toString().length > client.max_input || args[1].toString().length > client.max_input) {
    return client.createError(message, `${client.bot_emojis.error} | User can't be longer than \`${client.max_input}\` characters!\n\n**Usage:** \`${client.prefix} ship <text> <user>\``);
   }
   const ship = Math.floor(Math.random() * 100) + 1;
   const bar = progressbar(100, ship, 10, `${client.bot_emojis.emoji_bar_1}`, `${client.bot_emojis.emoji_bar_2}`, `${client.bot_emojis.broken_heart} `, ` ${client.bot_emojis.heart}`, false);
   const mehh = new MessageEmbed() // Prettier
    .setTitle(
     `${client.bot_emojis.reverse_nr_2_motherfucker} This isn't a match`,
     message.guild.iconURL({
      dynamic: true,
      format: "png",
     })
    )
    .setThumbnail("https://cdn.discordapp.com/emojis/853644938867769454.gif?v=1")
    .setDescription(`I shipped **${user1}** with **${user2}** and it is **${ship}%**\n${bar}`)
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setColor("RED");
   const love = new MessageEmbed() // Prettier
    .setTitle(
     `${client.bot_emojis.reverse_nr_2_motherfucker} They are born for each others!`,
     message.guild.iconURL({
      dynamic: true,
      format: "png",
     })
    )
    .setThumbnail("https://cdn.discordapp.com/emojis/797365365595439104.gif?v=1")
    .setDescription(`I shipped **${user1}** with **${user2}** and it is **${ship}%**\n${bar}`)
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setColor("GREEN");
   if (ship > 50) {
    message.reply({ embeds: [love] });
   } else {
    message.reply({ embeds: [mehh] });
   }
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
