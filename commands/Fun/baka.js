const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "baka",
 aliases: [],
 description: "BAKA!!!",
 category: "Fun",
 usage: "baka",
 run: async (client, message, args) => {
  (async () => {
   try {
    const response = await fetch("https://nekos.life/api/v2/img/baka");
    const body = await response.json();
    const embed = new MessageEmbed() // Prettier
     .setTitle(
      `${client.bot_emojis.rage} Baka!`,
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTimestamp()
     .setURL(body.url);
    message.reply({ embeds: [embed] });
   } catch (err) {
    console.log(err);
    message.reply({ embeds: [client.command_error_embed] });
   }
  })();
 },
};
