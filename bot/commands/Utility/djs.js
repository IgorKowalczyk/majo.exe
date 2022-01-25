const fetch = require("node-fetch");

module.exports = {
 name: "djs",
 aliases: ["discordjs", "djsdocs"],
 description: "Look at the Discord.js docs",
 category: "Utility",
 usage: "djs <query>",
 run: async (client, message, args) => {
  try {
   const query = args[0];
   let version = message.content.split("--src=")[1];
   if (!version) version = "stable";
   if (!query) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter a term to search!\n\n**Usage:** \`${client.prefix} djs <query>\``);
   }
   const res = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${version}&q=${query}`);
   const body = await res.json();
   return message.reply({ embeds: [body] }).catch((c) => {
    return client.createError(message, `${client.bot_emojis.error} | Invaild query. Please try again with diffrent query!!\n\n**Usage:** \`${client.prefix} djs <query>\``);
   });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
