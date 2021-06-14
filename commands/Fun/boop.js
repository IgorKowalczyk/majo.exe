const Discord = require("discord.js");

module.exports = {
 name: "boop",
 aliases: [],
 description: "Boop-Beep!",
 category: "Fun",
 usage: "boop",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed() // Prettier()
    .setColor("RANDOM")
    .setTitle("⏰ Beep!");
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
