import { EmbedBuilder, PermissionsBitField } from "discord.js";

/**
 * End a giveaway
 *
 * @param {object} client - Discord Client
 * @param {object} interaction - Discord Interaction
 * @param {string} color - Embed color
 * @returns {Promise<void>} Promise that resolves when the giveaway is ended
 * @throws {Error} Error that is thrown if the giveaway could not be ended
 * */
export async function EndGiveaway(client, interaction, color) {
 try {
  await interaction.deferReply({ ephemeral: true });

  if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return client.errorMessages.createSlashError(interaction, "❌ You do not have permission to find giveaways! You need `MANAGE_GUILD` permission.");

  const query = interaction.options.getString("query");
  const giveaway = client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

  if (!giveaway) {
   return client.errorMessages.createSlashError(interaction, `❌ No giveaway found for \`${query}\`!`);
  }

  if (giveaway.ended) {
   return client.errorMessages.createSlashError(interaction, `❌ Giveaway \`${query}\` has already ended!`);
  }

  try {
   await client.giveawaysManager.end(giveaway.messageId);
  } catch (_err) {
   return client.errorMessages.createSlashError(interaction, "❌ Something went wrong while ending the giveaway!");
  }

  const embed = new EmbedBuilder()
   .setDescription(`${client.config.emojis.sparkles} | Success! Giveaway \`${query}\` ended!`)
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
