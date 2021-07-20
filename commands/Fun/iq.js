const Discord = require("discord.js");

module.exports = {
 name: "iq",
 aliases: [],
 description: "Display a user IQ",
 category: "Fun",
 usage: "iq",
 run: async (client, message, args) => {
  try {
   const iq = Math.floor(Math.random() * 226);
   const embed = new Discord.MessageEmbed() // Prettier()
    .setTitle(":brain: IQ Test:")
    .setDescription(":bulb: " + message.author.username + " IQ: `" + iq + "`")
    .setColor(`RANDOM`)
    .setTimestamp()
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
