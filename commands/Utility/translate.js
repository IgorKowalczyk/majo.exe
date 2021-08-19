const Discord = require("discord.js");
const translate = require("@iamtraction/google-translate");

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
   translate(text, { to: language.toLowerCase()}).then(res => {
    console.log(res.from.language);
    const embed = new Discord.MessageEmbed()
    .setTitle(`${client.bot_emojis.success} Success!`)
    .setDescription(`From: \`${res.from.language}\`\nTo: \`${language.toLowerCase()}\``)
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
    )
    message.lineReply(embed); 
  }).catch(err => {
   return message.lineReply({
    embed: {
     color: 16734039,
     description: `${client.bot_emojis.error} | Something went wrong while translating!`,
    },
   });
  });
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
