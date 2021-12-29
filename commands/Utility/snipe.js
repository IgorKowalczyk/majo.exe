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
    return client.createError(message, `${client.bot_emojis.error} There's nothing to snipe!`);
   }
   const embed = new MessageEmbed() // Prettier
    .setAuthor({ name: msg.author, iconURL: msg.member.user.displayAvatarURL() })
    .setDescription(msg.content || "I can't download the message content. Sorry!")
    .setFooter({
     text: `Requested by ${message.author.username}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setTimestamp()
    .setColor("RANDOM");
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
