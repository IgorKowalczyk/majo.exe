const axios = require("axios").default;
const Discord = require("discord.js");

module.exports = {
 name: "red-panda",
 aliases: [],
 description: "Sends a random red panda image",
 category: "Fun",
 usage: "red-panda",
 run: async (client, message, args) => {
  try {
   const options = {
    method: "GET",
    url: "https://some-random-api.ml/img/red_panda",
   };
   axios.request(options).then((response) => {
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setFooter(
      "Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTitle("🐼 Red Panda")
     .setImage(response.data.link);
    message.lineReply(embed);
   });
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
