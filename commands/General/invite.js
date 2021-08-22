const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
 name: "invite",
 aliases: [],
 description: "Invite me to your server",
 category: "General",
 usage: "invite",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed() // Prettier
    .setColor("RANDOM")
    .setTitle(`${client.bot_emojis.success} Yay!`)
    .setDescription(`${client.bot_emojis.tada} **[Click this link to invite me!](https://discord.com/oauth2/authorize/?permissions=${config.permissions}&scope=${config.scopes}&client_id=${client.user.id})** **__[Recomended!]__**\nOr [click this link to invite me *as root*](https://discord.com/oauth2/authorize/?permissions=8&scope=${config.scopes}&client_id=${client.user.id}) [Not recomended!]`)
    .setTimestamp()
    .setFooter(
     `~${client.user.username} created by ${config.author}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   return message.lineReply(embed);
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
