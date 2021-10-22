const { MessageEmbed } = require("discord.js");

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
    return client.createError(message, `${client.bot_emojis.error} There's nothing to snipe!`)
   }
   const embed = new MessageEmbed() // Prettier
    .setAuthor(msg.author, msg.member.user.displayAvatarURL())
    .setDescription(msg.content || "I can't download the message content. Sorry!")
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
    .setTimestamp()
    .setColor("RANDOM");
   message.reply({embeds: [embed]});
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
