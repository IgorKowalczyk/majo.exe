const Discord = require("discord.js");

module.exports = {
 name: "ohajo",
 aliases: [],
 description: "OHAJO GUYS",
 category: "Fun",
 usage: "ohajo",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setTitle(`${client.bot_emojis.hot} OHAJO!`)
    .setImage("https://media.discordapp.net/attachments/721019707607482409/881184668542730290/i_mean_ohajo.png")
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
