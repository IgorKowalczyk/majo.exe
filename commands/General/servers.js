const Discord = require("discord.js");

module.exports = {
 name: "servers",
 aliases: [],
 description: "Displays total servers where I'm",
 category: "General",
 usage: "servers",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed() // Prettier()
    .setDescription("🚀 I'm in " + `${client.guilds.cache.size}` + " servers!")
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setColor("RANDOM")
    .setTimestamp();
   message.lineReply(embed);
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
