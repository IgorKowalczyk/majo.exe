const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "end-giveaway",
 aliases: ["gend", "giveaway-end"],
 description: "Ends a giveaway",
 category: "Giveaway",
 usage: "end-giveaway <giveaway id/giveaway prize>",
 run: async (client, message, args) => {
  try {
   const query = args.join(" ");
   if (!query) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter a giveaway message ID / giveaway prize!\n\n**Usage:** \`${client.prefix} end-giveaway <giveaway id/giveaway prize>\``);
   }
   const giveaway =
    client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === message.guild.id) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === message.guild.id);
   if (!giveaway) {
    return client.createError(message, `${client.bot_emojis.error} | No giveaway found for \`${query}\`!`);
   }
   if (giveaway.ended) {
    return client.createError(message, `${client.bot_emojis.error} | This giveaway already ended!`);
   }

   client.giveawaysManager
    .end(giveaway.messageId)
    .then(() => {
     const embed = new MessageEmbed()
      .setDescription(`${client.bot_emojis.sparkles} | Success! Giveaway \`${query}\` ended!`)
      .setColor("GREEN")
      .setFooter(
       `Requested by ${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      );
     return message.reply({ embeds: [embed] });
    })
    .catch((err) => {
     return client.createError(message, `${client.bot_emojis.error} | No giveaway found for \`${query}\``);
    });
  } catch (err) {
   console.log(err);
   return client.createCommandError(message, err);
  }
 },
};
