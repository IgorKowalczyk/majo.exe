import { EmbedBuilder } from "discord.js";

/**
 * @param {object} client Discord Client
 * @param {object} interaction Discord Interaction
 * @param {object} color Embed color
 * @returns {Promise<void>}
 * */
export async function PauseGiveaway(client, interaction, color) {
 try {
  await interaction.deferReply({ ephemeral: true });
  const query = interaction.options.getString("query");
  const giveaway = client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

  if (!giveaway) {
   return client.errorMessages.createSlashError(interaction, `❌ No giveaway found for \`${query}\`!`);
  }

  if (giveaway.ended) {
   return client.errorMessages.createSlashError(interaction, `❌ Giveaway \`${query}\` has already paused!`);
  }

  try {
   await client.giveawaysManager.pause(giveaway.messageId);
  } catch (err) {
   return client.errorMessages.createSlashError(interaction, "❌ Something went wrong while pausing the giveaway!");
  }

  const embed = new EmbedBuilder()
   .setDescription(`${client.config.emojis.sparkles} | Success! Giveaway \`${query}\` paused!`)
   .setColor(color)
   .setFooter({
    text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     size: 256,
    }),
   });
  return interaction.followUp({ embeds: [embed], ephemeral: true });
 } catch (err) {
  client.errorMessages.internalError(interaction, err);
 }
}
