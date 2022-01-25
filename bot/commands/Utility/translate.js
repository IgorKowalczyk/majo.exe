const { MessageEmbed } = require("discord.js");
const translate = require("@iamtraction/google-translate");
const languages = require("../../../utilities/translator");

module.exports = {
 name: "translate",
 aliases: ["google-translate"],
 description: "Translate a text using the Google Translator",
 category: "Utility",
 usage: "translate <language> <text to translate>",
 run: async (client, message, args) => {
  try {
   const language = args[0];
   const text = args.slice(1).join(" ");
   if (!language) {
    return client.createError(message, `${client.bot_emojis.error} | You must specify the language to which you want the text to be translated!\n\n**Usage:** \`${client.prefix} <language> <text to translate>\``);
   }
   if (!text) {
    return client.createError(message, `${client.bot_emojis.error} | You must specify the text to translate!\n\n**Usage:** \`${client.prefix} <language> <text to translate>\``);
   }
   if (text.toString().length > client.max_input) {
    return client.createError(message, `${client.bot_emojis.error} | Text must be shorter than \`${client.max_input}\` characters!\n\n**Usage:** \`${client.prefix} <language> <text to translate>\``);
   }
   if (languages.some((ele) => ele.name === language.toLowerCase()) || languages.some((ele) => ele.abrv === language.toLowerCase())) {
    translate(text, { to: language.toLowerCase() })
     .then((res) => {
      const embed = new MessageEmbed()
       .setTitle(`${client.bot_emojis.success} Success!`)
       .setDescription(`>>> From: \`${res.from.language.iso}\`\nTo: \`${language.toLowerCase()}\``)
       .addField(`${client.bot_emojis.input} Text to translate`, "```" + text + "```")
       .addField(`${client.bot_emojis.output} Tanslated text`, "```" + res.text + "```")
       .setColor("#4f545c")
       .setFooter({
        text: `Requested by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        }),
       });
      message.reply({ embeds: [embed] });
     })
     .catch((err) => {
      return client.createCommandError(message, err);
     });
   } else {
    return client.createError(`${client.bot_emojis.error} | Please enter a correct language to translate!`);
   }
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
