const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
 name: "dashboard",
 aliases: [],
 description: "Provide link to the web-dashboard",
 category: "General",
 usage: "dashboard",
 run: async (client, message, args) => {
  try {
   if (!process.env.DOMAIN) {
    const embed = new Discord.MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.error} Mheh!`)
     .setDescription("Our dashboard is not working at the moment, please try again later! We are sorry...")
     .setTimestamp()
     .setColor("RANDOM")
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    return message.lineReply(embed);
   }
   if (message.member.hasPermission("MANAGE_GUILD")) {
    const embed = new Discord.MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.success} Yay!`)
     .setDescription(`${client.bot_emojis.link} | Your server link: ${process.env.DOMAIN}/dashboard/${message.guild.id}\n${client.bot_emojis.link} | Dashboard link: ${process.env.DOMAIN}`)
     .setTimestamp()
     .setColor("RANDOM")
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.lineReply(embed);
   } else {
    const embed = new Discord.MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.success} Yay!`)
     .setDescription("🔗 Our dashboard link: " + process.env.DOMAIN)
     .setTimestamp()
     .setColor("RANDOM")
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.lineReply(embed);
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
