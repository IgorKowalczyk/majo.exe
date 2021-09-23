const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "boop",
 aliases: [],
 description: "Beep-Boop!",
 category: "Fun",
 usage: "boop",
 run: async (client, message, args) => {
  try {
   const embed = new MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setTitle(`${client.bot_emojis.clock} Boop!`)
    .setImage(`https://c.tenor.com/xEv4LjI27pkAAAAC/time-clock.gif`)
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   message.reply({ embeds: [client.command_error_embed] });
  }
 },
};
