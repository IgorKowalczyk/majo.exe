const Discord = require("discord.js");

module.exports = {
 name: "gdelete",
 aliases: ["giveaway-delete"],
 description: "Delete a giveaway",
 category: "Utility",
 usage: "gdelete <giveaway id>",
 run: async (client, message, args) => {
  try {
   const messageID = args[0];
   if (!messageID) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please enter a giveaway message ID`,
     },
    });
   }
   let giveaway = client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.messageID === args[0]);
   if (!giveaway) {
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Unable to find a giveaway for \`${args.join(" ")}\``,
     },
    });
   }
   client.giveawaysManager
    .delete(messageID)
    .then(() => {
     return message.lineReply({
      embed: {
       color: 4779354,
       description: `${client.bot_emojis.success} | Success! Giveaway deleted!`,
      },
     });
    })
    .catch((err) => {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | No giveaway found for \`${messageID}\`, please check and try again`,
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
