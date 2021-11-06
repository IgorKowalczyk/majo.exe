const { MessageEmbed } = require("discord.js");
const axios = require("axios").default;

module.exports = {
 name: "bot-token",
 aliases: ["discord-token"],
 description: "Generate (fake) random Discord Bot token",
 category: "Fun",
 usage: "bot-token",
 run: async (client, message, args) => {
  try {
   const options = {
    method: "GET",
    url: "https://some-random-api.ml/bottoken",
   };
   axios.request(options).then((response) => {
    const embed = new MessageEmbed()
     .setColor("RANDOM")
     .setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTitle(`${client.bot_emojis.discord_logo} Discord Token`)
     .setDescription("> ```" + response.data.token + "```\n>>> ||Notice: This token is automatically generated, it is not a real token for discord bot! It is only supposed to look like this!||");
    message.reply({ embeds: [embed] });
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
