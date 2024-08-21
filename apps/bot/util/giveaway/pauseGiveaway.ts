import { type ChatInputCommandInteraction, EmbedBuilder, type Message, PermissionsBitField, type ColorResolvable } from "discord.js";
import type { Majobot } from "../..";
import type { Giveaway } from "discord-giveaways";

export async function PauseGiveaway(client: Majobot, interaction: ChatInputCommandInteraction, color: ColorResolvable): Promise<Message | void> {
 try {
  await interaction.deferReply({ ephemeral: true });
  if (!interaction.guild || !interaction.guild.available) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server!");
  if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used by a member!");

  const userPermissions = interaction.member.permissions as PermissionsBitField;

  if (!userPermissions.has(PermissionsBitField.Flags.ManageGuild)) return client.errorMessages.createSlashError(interaction, "❌ You do not have permission to pause giveaways! You need `MANAGE_GUILD` permission.");

  const query = interaction.options.getString("query");
  if (!query) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a giveaway message ID!");

  const giveaway = client.giveawaysManager.giveaways.find((g: Giveaway) => g.messageId == query && g.guildId == interaction.guildId);

  if (!giveaway) return client.errorMessages.createSlashError(interaction, `❌ No giveaway found for \`${query}\`!`);

  if (giveaway.ended) return client.errorMessages.createSlashError(interaction, `❌ Giveaway \`${query}\` has already paused!`);

  try {
   await client.giveawaysManager.pause(giveaway.messageId);
  } catch (_err) {
   return client.errorMessages.createSlashError(interaction, "❌ Something went wrong while pausing the giveaway!");
  }

  const embed = new EmbedBuilder()
   .setDescription(`${client.config.emojis.sparkles} | Success! Giveaway \`${query}\` paused!`)
   .setColor(color)
   .setFooter({
    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     size: 256,
    }),
   });
  return interaction.followUp({ embeds: [embed], ephemeral: true });
 } catch (err: Error | any) {
  client.errorMessages.internalError(interaction, err.message);
 }
}
