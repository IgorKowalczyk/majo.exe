const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const shorten = require("isgd");
const { isURL } = require("validator");
module.exports = {
 name: "shortener",
 aliases: ["url-shortener", "link-shortener"],
 description: "Shorter a url",
 category: "Utility",
 usage: "shortener <link>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return client.createError(message, `${client.bot_emojis.error} | Please provide link!`);
   }
   if (!isURL(args[0])) {
    return client.createError(message, `${client.bot_emojis.error} | Please provide vaild link!`);
   }
   shorten.shorten(args[0], function (res) {
    const urldone = new MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTitle(`${client.bot_emojis.link} Your shortened URL`)
     .setDescription(`> Link: **${res}**`);
    const row = new MessageActionRow().addComponents(new MessageButton().setStyle("LINK").setURL(res).setLabel(`Go to ${res}`));
    message.reply({ embeds: [urldone], components: [row] });
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
