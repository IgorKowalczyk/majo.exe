const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "advice",
 aliases: [],
 description: "Get a random advice",
 category: "Fun",
 usage: "advice",
 run: async (client, message, args) => {
  try {
   const res = await fetch("https://api.adviceslip.com/advice"),
    { slip } = await res.json();
   const embed = new MessageEmbed()
    .setTitle(`${client.bot_emojis.thinking} My advice`)
    .setDescription(`>>> ${slip.advice}`)
    .setColor("RANDOM")
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setThumbnail(
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   return message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
