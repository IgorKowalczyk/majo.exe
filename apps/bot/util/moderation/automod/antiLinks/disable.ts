import { syncDatabaseAutoModRule } from "@majoexe/util/database";
import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { Majobot } from "@/index";
import type { GuildSettings } from "@/util/types/Command";

export async function disableAntiLink(client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) {
  if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
  const createdRule = await syncDatabaseAutoModRule(interaction.guild.id, "anti-link");

  if (!createdRule) {
    return client.errorMessages.createSlashError(interaction, "❌ The anti-link system is already `disabled`");
  }

  await interaction.guild.autoModerationRules.edit(createdRule.id, {
    enabled: false,
  });

  const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("⛔ Successfully `disabled` the anti-link system")
    .setDescription("The anti-link system has been `disabled`. All links will no longer be blocked.")
    .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
        size: 256,
      }),
    })
    .setThumbnail(
      interaction.guild.iconURL({
        size: 256,
      })
    );

  return interaction.followUp({ embeds: [embed] });
}
