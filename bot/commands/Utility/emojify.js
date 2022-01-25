const { MessageEmbed } = require("discord.js");
const emojify = require("../../../utilities/emojify");

module.exports = {
 name: "emojify",
 aliases: [],
 description: "Convert text to emojis",
 category: "Utility",
 usage: "emojify <text>",
 run: async (client, message, args) => {
  try {
   const emojis = args.join(" ");
   if (!emojis) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter text to convert!\n\n**Usage:** \`${client.prefix} emojify <text>\``);
   }
   if (args.toString().length > client.max_input) {
    return client.createError(message, `${client.bot_emojis.error} | You must enter a text shorter than \`${client.max_input}\` characters!\n\n**Usage:** \`${client.prefix} emojify <text>\``);
   }
   const converted = emojify(emojis);
   if (!converted) {
    return client.createError(message, `${client.bot_emojis.error} | I cannot convert the text! Please try again!\n\n**Usage:** \`${client.prefix} emojify <text>\``);
   }
   const embed = new MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setTitle(`Text To Emoji`)
    .addField("Converted text", converted)
    .addField("Converted text (Code)", "```" + converted.toString().substr(0, 1000) + "```")
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
