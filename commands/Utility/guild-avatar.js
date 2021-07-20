const Discord = require("discord.js");
const Extra = require("discord-buttons");

module.exports = {
 name: "guild-avatar",
 aliases: ["g-avatar"],
 description: "Get a guild avatar",
 category: "Utility",
 usage: "guild-avatar",
 run: async (client, message, args) => {
  try {
   const gavatar = message.guild.iconURL({
    dynamic: true,
    format: "png",
    size: 2048,
   });
   const button = new Extra.MessageButton() // Prettier()
    .setLabel("Avatar link")
    .setStyle("url")
    .setURL(gavatar);
   const embed = new Discord.MessageEmbed() // Prettier()
    .setColor("RANDOM")
    .setDescription("🔗 [Icon link](" + gavatar + ")")
    .setAuthor(message.guild.name + " Icon", gavatar)
    .setImage(gavatar)
    .setTimestamp()
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.lineReply({
    button: button,
    embed: embed,
   });
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
