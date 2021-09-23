const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "about",
 aliases: [],
 description: "Info about the bot and developer",
 category: "General",
 usage: "about",
 run: async (client, message, args) => {
  try {
   const embed = new MessageEmbed()
    .setAuthor(client.config.author)
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
    .addField(`${client.bot_emojis.discord_logo} About ${client.user.username}`, "> " + client.config.about_bot);
   if (client.config.about_dev) {
    embed.addField(`${client.bot_emojis.owner_crown} About Dev`, "> " + client.config.about_dev);
   }
   message.reply({ embeds: [embed] });
  } catch (err) {
   console.log(err);
   message.reply({ embeds: [client.command_error_embed] });
  }
 },
};
