const axios = require("axios").default;
const Discord = require("discord.js");

module.exports = {
 name: "bot-token",
 aliases: ["discord-token", "discord-bot-token"],
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
     .setTitle("<:discordlogo:856166057639149568> Random Discord Bot Token")
     .setDescription("```" + response.data.token + "```\n||Note: This token is propabbly fake!||");
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
