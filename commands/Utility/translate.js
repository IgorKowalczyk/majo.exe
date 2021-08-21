const Discord = require("discord.js");
const translate = require("@iamtraction/google-translate");
const languages = require("../../utilities/translate");

module.exports = {
 name: "translate",
 aliases: [],
 description: "Translate a text using the Google Translator",
 category: "Utility",
 usage: "translate <language> <text to translate>",
 run: async (client, message, args) => {
  try {
   const language = args[0];
   const text = args.slice(1).join(" ");
   if (!language) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You must specify the language to which you want the text to be translated!`,
     },
    });
   }
   if (!text) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | You must specify the text to translate!`,
     },
    });
   }
   if (languages.some((ele) => ele.name === language.toLowerCase()) || languages.some((ele) => ele.abrv === language.toLowerCase())) {
    translate(text, { to: language.toLowerCase() })
     .then((res) => {
      const embed = new Discord.MessageEmbed()
       .setTitle(`${client.bot_emojis.success} Success!`)
       .setDescription(`From: \`${res.from.language.iso}\`\nTo: \`${language.toLowerCase()}\``)
       .addField(`${client.bot_emojis.input} Text to translate`, "```" + text + "```")
       .addField(`${client.bot_emojis.output} Tanslated text`, "```" + res.text + "```")
       .setColor("RANDOM")
       .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        })
       );
      message.lineReply(embed);
     })
     .catch((err) => {
      console.log(err);
      return message.lineReply({
       embed: {
        color: 16734039,
        description: `${client.bot_emojis.error} | Something went wrong while translating!`,
       },
      });
     });
   } else {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please enter a correct language to translate!`,
     },
    });
   }
  } catch (err) {
   console.log(err);
   message.lineReply({
    embed: {
     color: 16734039,
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
