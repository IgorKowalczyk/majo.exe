const Discord = require("discord.js");

module.exports = {
 name: "servers",
 aliases: ["guilds"],
 description: "Displays total servers where I'm",
 category: "General",
 usage: "servers",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.rocket} I'm in \`${client.guilds.cache.size}\` servers!`)
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setImage("https://media.discordapp.net/attachments/721019707607482409/879068001264107520/hehehe-gangbang-hehhehe.png")
    .setColor("RANDOM")
    .setTimestamp();
   message.lineReply(embed);
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
