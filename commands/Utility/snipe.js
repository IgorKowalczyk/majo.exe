const Discord = require("discord.js");

module.exports = {
 name: "snipe",
 aliases: [],
 description: "Snipe a deleted message",
 category: "Utility",
 usage: "snipe",
 run: async (client, message, args) => {
  try {
   const msg = client.snipes.get(message.channel.id);
   if (!msg) {
    const embed = new Discord.MessageEmbed() // Prettier
     .setDescription(":x: There is nothing to snipe :(")
     .message.lineReply(embed);
   }
   const embed = new Discord.MessageEmbed() // Prettier
    .setAuthor(msg.author, msg.member.user.displayAvatarURL())
    .setDescription(msg.content)
    .setFooter(`||Get sniped lmao!|| | Requested by ${message.author.username}`, message.author.displayAvatarURL())
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
