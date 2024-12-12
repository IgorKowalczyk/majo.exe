import { GuildLogType } from "@majoexe/database";
import { createLog } from "@majoexe/util/database";
import type { Giveaway } from "discord-giveaways";
import { type ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField, type ColorResolvable, type Message } from "discord.js";
import type { Majobot } from "@/index";

export async function RerollGiveaway(client: Majobot, interaction: ChatInputCommandInteraction, color: ColorResolvable): Promise<Message | void> {
 try {
  await interaction.deferReply({ ephemeral: true });
  if (!interaction.guild || !interaction.guild.available) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server!");
  if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used by a member!");

  const userPermissions = interaction.memberPermissions || new PermissionsBitField();

  if (!userPermissions.has(PermissionsBitField.Flags.ManageGuild)) return client.errorMessages.createSlashError(interaction, "❌ You do not have permission to reroll giveaways! You need `MANAGE_GUILD` permission.");

  const query = interaction.options.getString("query");
  if (!query) return client.errorMessages.createSlashError(interaction, "❌ You need to provide a giveaway message ID!");

  const giveaway = client.giveawaysManager.giveaways.find((g: Giveaway) => g.messageId == query && g.guildId == interaction.guildId);

  if (!giveaway) return client.errorMessages.createSlashError(interaction, `❌ No giveaway found for \`${query}\`!`);

  if (!giveaway.ended) return client.errorMessages.createSlashError(interaction, `❌ Giveaway \`${query}\` is still running!`);

  try {
   await client.giveawaysManager.reroll(giveaway.messageId);
  } catch (_err) {
   return client.errorMessages.createSlashError(interaction, "❌ Something went wrong while rerolling the giveaway!");
  }

  await createLog(interaction.guild.id, interaction.user.id, {
   content: `Rerolled giveaway \`${giveaway.prize.replace(`${client.config.emojis.giveaway} Giveaway: `, "").replace(`${client.config.emojis.giveaway} Drop: `, "")}\``,
   type: GuildLogType.GiveawayEdit,
  });

  const embed = new EmbedBuilder()
   .setDescription(`${client.config.emojis.sparkles} | Success! Giveaway \`${query}\` rerolled!`)
   .setColor(color)
   .setFooter({
    text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     size: 256,
    }),
   });
  return interaction.followUp({ embeds: [embed], ephemeral: true });
 } catch (err: unknown) {
  client.errorMessages.internalError(interaction, err);
 }
}
