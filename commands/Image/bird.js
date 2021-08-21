const axios = require("axios").default;
const Discord = require("discord.js");

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
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTitle(`${client.bot_emojis.bird} Bird`)
     .setImage(response.data.link);
    message.lineReply(embed);
   });
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
