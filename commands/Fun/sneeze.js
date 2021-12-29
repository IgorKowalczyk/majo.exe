const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "sneeze",
 aliases: [],
 description: "Achoo!",
 category: "Fun",
 usage: "sneeze",
 run: async (client, message, args) => {
  try {
   const sneezes = ["**Achoo!**", "*chew!*", "Ah... Ah... **A_CHOO!_**", "_Ah..._***CHOOOOOOOOOOOOOOOOOOOO!***", "*Achoo!* Excuse me!"];
   const embed = new MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setAuthor({ name: client.bot_emojis.sneeze })
    .setTitle(`>>> ${sneezes[Math.floor(Math.random() * Math.floor(sneezes.length))]}`)
    .setImage(`https://media.discordapp.net/attachments/709721624588320840/894226312019968070/sneeze.gif`)
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
