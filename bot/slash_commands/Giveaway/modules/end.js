const { MessageEmbed } = require("discord.js");

module.exports = async (client, interaction, args) => {
 try {
  if (!interaction.member.permissions.has("MANAGE_GUILD")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't end giveaway. Missing permission: \`MANAGE_GUILD\``);
  }
  if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | You can't end giveaway. Missing permission: \`MANAGE_MESSAGES\``);
  }
  const query = args.join(" ");
  if (!query) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | Please enter a giveaway message ID / giveaway prize!`);
  }
  const giveaway =
   client.giveawaysManager.giveaways.find((g) => g.prize.replace(`${client.bot_emojis.giveaway} Drop: `, "").replace(/.$/, "") === query && g.guildId === interaction.guild.id) ||
   // Search with giveaway ID
   client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);
  if (!giveaway) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | No giveaway found for \`${query}\`!`);
  }
  if (giveaway.ended) {
   return client.createSlashError(interaction, `${client.bot_emojis.error} | This giveaway already ended!`);
  }

  client.giveawaysManager
   .end(giveaway.messageId)
   .then(() => {
    const embed = new MessageEmbed()
     .setDescription(`${client.bot_emojis.sparkles} | Success! Giveaway \`${query}\` ended!`)
     .setColor("GREEN")
     .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      }),
     });
    return interaction.followUp({ embeds: [embed] });
   })
   .catch((err) => {
    return client.createSlashError(interaction, `${client.bot_emojis.error} | No giveaway found for \`${query}\``);
   });
 } catch (err) {
  console.log(err);
  return client.createSlashCommandError(interaction, err);
 }
};
