const Discord = require("discord.js");
const shorten = require("isgd");
const { MessageButton, default: discordButtons, MessageActionRow } = require("discord-buttons");

module.exports = {
 name: "shortener",
 aliases: ["url-shortener", "link-shortener"],
 description: "Shorter a url",
 category: "Utility",
 usage: "shortener <link>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please provide a link!`,
     },
    });
   }
   shorten.shorten(args[0], function (res) {
    const urldone = new Discord.MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTitle(`${client.bot_emojis.link} Your shortened URL`)
     .setDescription(`> Link: **${res}**`);
    const url_button = new MessageButton() // Prettier
     .setStyle("url")
     .setLabel(`Go to ${res}`)
     .setURL(`${res}`)
     .setEmoji(client.bot_emojis.link);
    message.lineReply(urldone, url_button);
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
