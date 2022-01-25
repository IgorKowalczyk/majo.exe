const { MessageEmbed } = require("discord.js");
const axios = require("axios").default;

module.exports = {
 name: "pikachu",
 aliases: [],
 description: "Sends a random pikachu image",
 category: "Fun",
 usage: "pikachu",
 run: async (client, message, args) => {
  try {
   const options = {
    method: "GET",
    url: "https://some-random-api.ml/img/pikachu",
   };
   axios.request(options).then((response) => {
    const embed = new MessageEmbed()
     .setColor("RANDOM")
     .setFooter({
      text: `Requested by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     })
     .setTitle(`${client.bot_emojis.pikachu} Pikachu!`)
     .setImage(response.data.link);
    message.reply({ embeds: [embed] });
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
