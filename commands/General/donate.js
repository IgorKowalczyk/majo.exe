const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
 name: "donate",
 aliases: [],
 description: "Donate the project to help us!",
 category: "General",
 usage: "donate",
 run: async (client, message, args) => {
  try {
   const embed = new Discord.MessageEmbed() // Prettier
    .setTitle(`${client.bot_emojis.sparkles} Donate to ${client.user.username}`) //
    .setTimestamp()
    .setThumbnail(
     client.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setAuthor(config.author)
    .setColor("RANDOM")
    .setFooter(
     `Requested by ${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    ) // Prettier
    .setDescription(`${config.patreon ? `• ${client.bot_emojis.parteon_logo} **Patreon:** https://patreon.com/` + config.patreon : `${client.bot_emojis.parteon_logo} **Patreon:** -`}
    ${config.open_collective ? `• ${client.bot_emojis.open_collective_logo} **OpenCollective:** https://opencollective.com/` + config.open_collective : `${client.bot_emojis.open_collective_logo} **OpenCollective:** -`}
    ${config.ko_fi ? `• ${client.bot_emojis.kofi_logo} **Ko-Fi:** https://ko-fi.com/` + config.ko_fi : `${client.bot_emojis.kofi_logo} **Ko-Fi:** -`}
    ${config.buymeacoffee ? `• ${client.bot_emojis.buymeacoffee_logo} **BuyMeaCoffee:** https://buymeacoffee.com/` + config.buymeacoffee : `${client.bot_emojis.buymeacoffee_logo} **BuyMeaCoffee:** -`}
    `);
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
