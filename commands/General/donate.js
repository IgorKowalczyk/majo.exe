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
    .setTitle(`Donate ${client.user.username}`) //
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
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    )
    .setDescription(`${config.patreon ? "<:patreon:876452398879629322> **Patreon:** [https://patreon.com/" + config.patreon + "](" + config.patreon + ")" : "<:patreon:876452398879629322> **Patreon:** -"}
    ${config.open_collective ? "<:opencollective:876452400171479100> **OpenCollective:** [https://opencollective.com/" + config.open_collective + "](" + config.open_collective + ")" : "<:opencollective:876452400171479100> **OpenCollective:** -"}
    ${config.ko_fi ? "<:kofi:876452398934155264> **Ko-Fi:** [https://ko-fi.com/" + config.ko_fi + "](" + config.ko_fi + ")" : "<:kofi:876452398934155264> **Ko-Fi:** -"}
    `);
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
