const axios = require("axios").default;
const Discord = require("discord.js");

module.exports = {
 name: "animal-fact",
 aliases: ["ani-fact"],
 description: "Shows a random fact about animal",
 category: "Fun",
 usage: "animal-fact",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You must enter animal name!`,
     },
    });
   }
   const options = {
    method: "GET",
    url: `https://some-random-api.ml/facts/${args.join(" ")}`,
   };
   axios
    .request(options)
    .then((response) => {
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
      .setTitle(`${client.bot_emojis.sparkles} ${args.join(" ")} Fact`)
      .setDescription(response.data.fact);
     message.lineReply(embed);
    })
    .catch(() => {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | Sorry, we don't have any facts for that animal`,
      },
     });
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
