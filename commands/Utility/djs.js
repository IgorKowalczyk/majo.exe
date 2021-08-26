const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "djs",
 aliases: ["discordjs", "djsdocs"],
 description: "Look at the discord.js docs",
 category: "Utility",
 usage: "djs (query)",
 run: async (client, message, args) => {
  try {
   const query = args[0];
   let version = message.content.split("--src=")[1];
   if (!version) version = "stable";
   if (!query)
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} | Please enter a term to search!`,
     },
    });
   const res = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${version}&q=${query}`);
   const body = await res.json();
   return message
    .lineReply({
     embed: body,
    })
    .catch((c) => {
     message.lineReply({
      embed: {
       color: 16734039,
       description: `${client.bot_emojis.error} | Invaild query!`,
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
