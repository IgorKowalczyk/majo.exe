const Discord = require("discord.js");

module.exports = {
 name: "sneeze",
 aliases: [],
 description: "Achoo!",
 category: "Fun",
 usage: "sneeze",
 run: async (client, message, args) => {
  try {
   const sneezes = ["**Achoo!**", "*chew!*", "Ah... Ah... **A_CHOO!_**", "_Ah..._***CHOOOOOOOOOOOOOOOOOOOO!***", "*Achoo!* Excuse me!"];
   const embed = new Discord.MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setTitle(`${client.bot_emojis.sneeze} ${sneezes[Math.floor(Math.random() * Math.floor(sneezes.length))]}`)
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
