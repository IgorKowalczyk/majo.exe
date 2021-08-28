const Discord = require("discord.js");
const Extra = require("discord-buttons");

module.exports = {
 name: "guild-avatar",
 aliases: ["g-avatar", "guild-icon", "icon-guild", "guild-image", "guild-img", "guild-pfp"],
 description: "Get a guild avatar",
 category: "Utility",
 usage: "guild-avatar",
 run: async (client, message, args) => {
  try {
   const gicon = message.guild.iconURL({
    dynamic: true,
    format: "png",
    size: 2048,
   });
   const button = new Extra.MessageButton() // Prettier
    .setLabel("Avatar link")
    .setStyle("url")
    .setURL(gicon);
   const embed = new Discord.MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setDescription(`${client.bot_emojis.link} [Icon link](${gicon})`)
    .setAuthor(message.guild.name + " Icon", gicon)
    .setImage(gicon)
    .setTimestamp()
    .setFooter(
     `Requested by ${message.author.username}`,
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
     description: `Something went wrong... ${client.bot_emojis.sadness}`,
    },
   });
  }
 },
};
