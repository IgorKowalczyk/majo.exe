const { MessageEmbed } = require("discord.js");
const progressbar = require("percentagebar");

module.exports = {
 name: "ship",
 description: "❤️ Ship users together",
 usage: "/ship <user> <user>",
 category: "Fun",
 options: [
  {
   name: "first",
   description: "First user",
   required: true,
   type: 6,
  },
  {
   name: "secound",
   description: "Secound user",
   required: true,
   type: 6,
  },
 ],
 run: async (client, interaction, args) => {
  const user1 = interaction.guild.members.cache.get(args[0]);
  if (!user1) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | Please mention a first user to ship!`);
  }
  const user2 = interaction.guild.members.cache.get(args[1]);
  if (!user2) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | Please mention a secound user to ship!`);
  }
  const ship = Math.floor(Math.random() * 100) + 1;
  const bar = progressbar(100, ship, 10, `${client.bot_emojis.emoji_bar_1}`, `${client.bot_emojis.emoji_bar_2}`, `${client.bot_emojis.broken_heart} `, ` ${client.bot_emojis.heart}`, false);
  const mehh = new MessageEmbed() // Prettier
   .setTitle(
    `${client.bot_emojis.reverse_nr_2_motherfucker} This isn't a match`,
    interaction.guild.iconURL({
     dynamic: true,
     format: "png",
    })
   )
   .setThumbnail("https://cdn.discordapp.com/emojis/853644938867769454.gif?v=1")
   .setDescription(`I shipped **${user1}** with **${user2}** and it is **${ship}%**\n${bar}`)
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .setColor("RED");
  const love = new MessageEmbed() // Prettier
   .setTitle(
    `${client.bot_emojis.reverse_nr_2_motherfucker} They are born for each others!`,
    interaction.guild.iconURL({
     dynamic: true,
     format: "png",
    })
   )
   .setThumbnail("https://cdn.discordapp.com/emojis/797365365595439104.gif?v=1")
   .setDescription(`I shipped **${user1}** with **${user2}** and it is **${ship}%**\n${bar}`)
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   })
   .setColor("GREEN");
  if (ship > 50) {
   interaction.followUp({ embeds: [love] });
  } else {
   interaction.followUp({ embeds: [mehh] });
  }
 },
};
