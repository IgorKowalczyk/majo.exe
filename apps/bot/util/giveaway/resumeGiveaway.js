import { EmbedBuilder } from "discord.js";

/**
 * Resume a giveaway.
 *
 * @param {object} client - Discord Client
 * @param {object} interaction - Discord Interaction
 * @param {string} color - Embed color
 * @returns {Promise<void>} Promise that resolves when the giveaway is resumed
 * @throws {Error} Error that is thrown if the giveaway could not be resumed
 * */
export async function ResumeGiveaway(client, interaction, color) {
 try {
  await interaction.deferReply({ ephemeral: true });
  const query = interaction.options.getString("query");
  const giveaway = client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

  if (!giveaway) {
   return client.errorMessages.createSlashError(interaction, `❌ No giveaway found for \`${query}\`!`);
  }

  if (giveaway.ended) {
   return client.errorMessages.createSlashError(interaction, `❌ Giveaway \`${query}\` has already ended!`);
  }

  try {
   await client.giveawaysManager.unpause(giveaway.messageId);
  } catch (err) {
   return client.errorMessages.createSlashError(interaction, "❌ Something went wrong while resuming the giveaway!");
  }

  const embed = new EmbedBuilder()
   .setDescription(`${client.config.emojis.sparkles} | Success! Giveaway \`${query}\` resumed!`)
   .setColor(color)
   .setFooter({
    text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
    iconURL: interaction.member.user.displayAvatarURL({
     size: 256,
    }),
   });
  return interaction.followUp({ embeds: [embed], ephemeral: true });
 } catch (err) {
  client.errorMessages.internalError(interaction, err);
 }
}
