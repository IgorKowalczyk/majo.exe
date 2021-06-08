const Discord = require("discord.js");

module.exports = {
 name: "gfetch",
 aliases: ["giveaway-fetch", "glist", "giveaway-list"],
 description: "Create a giveaway",
 category: "Utility",
 usage: "gfetch",
 run: async (client, message, args) => {
  try {
   const giveaways = client.giveawaysManager.giveaways.filter((g) => g.guildID === message.guild.id);
   console.log(giveaways);
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
