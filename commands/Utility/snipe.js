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
    return message.lineReply({
     embed: {
      color: 16734039,
      description: `${client.bot_emojis.error} There is nothing to snipe!`,
     },
    });
   }
   const embed = new Discord.MessageEmbed() // Prettier
    .setAuthor(msg.author, msg.member.user.displayAvatarURL())
    .setDescription("```" + msg.content || "I can't download the message content. Sorry!" + "```")
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
    .setTimestamp()
    .setColor("RANDOM");
   message.lineReply(embed);
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
