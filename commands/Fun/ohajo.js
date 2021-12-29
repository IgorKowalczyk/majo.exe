const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "ohajo",
 aliases: [],
 description: "OHAJO GUYS",
 category: "Fun",
 usage: "ohajo",
 run: async (client, message, args) => {
  try {
   const embed = new MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setTitle(`${client.bot_emojis.hot} OHAJO!`)
    .setImage("https://media.discordapp.net/attachments/721019707607482409/881184668542730290/i_mean_ohajo.png")
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
