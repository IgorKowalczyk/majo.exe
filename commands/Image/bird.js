const { MessageEmbed } = require("discord.js");
const axios = require("axios").default;

module.exports = {
 name: "bird",
 aliases: ["birb"],
 description: "Sends a random bird image",
 category: "Fun",
 usage: "bird",
 run: async (client, message, args) => {
  try {
   const options = {
    method: "GET",
    url: "https://some-random-api.ml/img/birb",
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
     .setTitle(`${client.bot_emojis.bird} Bird`)
     .setImage(response.data.link);
    message.reply({ embeds: [embed] });
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
