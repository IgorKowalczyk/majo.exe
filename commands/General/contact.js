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
    const embed = new Discord.MessageEmbed() // Prettier()
     .setTitle("<a:error:759354037803024395> Mheh!")
     .setDescription("Our dashboard (and the contact page) is not working at the moment, please try again later!")
     .setTimestamp()
     .setColor("RANDOM")
     .setFooter(
      "Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    return message.lineReply(embed);
   }
   const embed = new Discord.MessageEmbed() // Prettier()
    .setTitle("<a:sucess:759354039242063903> Yay!")
    .setDescription("🔗 Contact Form: " + process.env.DOMAIN + "contact")
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
     "Requested by " + `${message.author.username}`,
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
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};
