const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
 name: "contact",
 aliases: [],
 description: "Provide website link to contact us",
 category: "General",
 usage: "contact",
 run: async (client, message, args) => {
  try {
   if (!process.env.DOMAIN) {
    const embed = new Discord.MessageEmbed() // Prettier
     .setTitle(`${client.bot_emojis.error} Mheh!`)
     .setDescription("Our dashboard (and the contact page itself) is not working at the moment, please try again later! We are sorry...")
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
   const embed = new Discord.MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.success} Yay!`)
    .setDescription(`${client.bot_emojis.link} | Contact Form: ${process.env.DOMAIN}/contact`)
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
