const { MessageEmbed } = require("discord.js");

module.exports = {
 name: "reroll-giveaway",
 aliases: ["reroll", "giveaway-reroll"],
 description: "Reroll a giveaway",
 category: "Giveaway",
 usage: "reroll-giveaway <giveaway id/giveaway prize>",
 run: async (client, message, args) => {
  try {
   const query = args.join(" ");
   if (!query) {
    return client.createError(message, `${client.bot_emojis.error} | Please enter a giveaway message ID / giveaway prize!\n\n**Usage:** \`${client.prefix} reroll-giveaway <giveaway id/giveaway prize>\``);
   }
   const giveaway =
    client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === message.guild.id) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === message.guild.id);
   if (!giveaway) {
    return client.createError(message, `${client.bot_emojis.error} | No giveaway found for \`${query}\`!`);
   }
   if (!giveaway.ended) {
    return client.createError(message, `${client.bot_emojis.error} | This giveaway is still running!`);
   }
   client.giveawaysManager
    .reroll(giveaway.messageId)
    .then(() => {
     const embed = new MessageEmbed()
      .setDescription(`${client.bot_emojis.sparkles} | Success! Giveaway \`${query}\` rerolled!`)
      .setColor("GREEN")
      .setFooter({
       text: `Requested by ${message.author.username}`,
       iconURL: message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       }),
      });
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
