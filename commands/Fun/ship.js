const Discord = require("discord.js");
const progressbar = require("percentagebar");

module.exports = {
 name: "ship",
 aliases: [],
 description: "Ship useers together",
 category: "Fun",
 usage: "ship <user> <user>",
 run: async (client, message, args) => {
  try {
   const user1 = args[0];
   if (!user1) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please mention a first user to ship!\n\n**Usage:** \`${process.env.PREFIX} ship <user> <user>\``,
     },
    });
   }
   const user2 = args[1];
   if (!user2) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please mention a secound user to ship!\n\n**Usage:** \`${process.env.PREFIX} ship <user> <user>\``,
     },
    });
   }
   const ship = Math.floor(Math.random() * 100) + 1;
   const bar = progressbar(100, ship, 10, `${client.bot_emojis.emoji_bar_1}`, `${client.bot_emojis.emoji_bar_2}`, `${client.bot_emojis.broken_heart} `, ` ${client.bot_emojis.heart}`, false);
   const mehh = new Discord.MessageEmbed() // Prettier
    .setTitle(
     `${client.bot_emojis.reverse_nr_2_motherfucker} This isn't a match`,
     message.guild.iconURL({
      dynamic: true,
      format: "png",
     })
    )
    .setThumbnail("https://cdn.discordapp.com/emojis/853644938867769454.gif?v=1")
    .setDescription(`I shipped **${user1}** with **${user2}** and it is **${ship}%**\n${bar}`)
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setColor("RED");
   const love = new Discord.MessageEmbed() // Prettier
    .setTitle(
     `${client.bot_emojis.reverse_nr_2_motherfucker} They are born for each others!`,
     message.guild.iconURL({
      dynamic: true,
      format: "png",
     })
    )
    .setThumbnail("https://cdn.discordapp.com/emojis/797365365595439104.gif?v=1")
    .setDescription(`I shipped **${user1}** with **${user2}** and it is **${ship}%**\n${bar}`)
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setColor("GREEN");
   if (ship > 50) {
    message.lineReply(love);
   } else {
    message.lineReply(mehh);
   }
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
