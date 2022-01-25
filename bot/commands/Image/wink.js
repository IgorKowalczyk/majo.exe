const { MessageEmbed } = require("discord.js");
const axios = require("axios").default;

module.exports = {
 name: "wink",
 aliases: [],
 description: "Sends a random winking image",
 category: "Fun",
 usage: "wink",
 run: async (client, message, args) => {
  try {
   const options = {
    method: "GET",
    url: "https://some-random-api.ml/animu/wink",
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
     .setTitle(`${client.bot_emojis.wink} Hehe`)
     .setImage(response.data.link);
    message.reply({ embeds: [embed] });
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
