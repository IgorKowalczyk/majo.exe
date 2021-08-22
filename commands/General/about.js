const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
 name: "about",
 aliases: [],
 description: "Info about the bot and developer",
 category: "General",
 usage: "about",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed()
    .setAuthor(config.author)
    .setTimestamp()
    .setThumbnail(
     client.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setColor("RANDOM")
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .addField(`${client.bot_emojis.discord_logo} About ${client.user.username}`, "> " + config.about_bot);
   if (config.about_dev) {
    embed.addField(`${client.bot_emojis.owner_crown} About Dev`, "> " + config.about_dev);
   }
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
