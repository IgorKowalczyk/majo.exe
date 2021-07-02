const axios = require("axios").default;
const Discord = require("discord.js");

module.exports = {
 name: "base64",
 aliases: ["b64", "base-64"],
 description: "Encode text to Base64 format",
 category: "Utility",
 usage: "base64 <text>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You must enter a text to encode!",
     },
    });
   }
   if (!args[0].lenght > 50) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: "❌ | You must enter a text shorer than 50 characters!",
     },
    });
   }
   const options = {
    method: "GET",
    url: `https://some-random-api.ml/base64?encode=${args.join(" ")}`,
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
     .setTitle(`✨ Base64 Encoder`)
     .setDescription("```" + response.data.base64 + "```");
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
