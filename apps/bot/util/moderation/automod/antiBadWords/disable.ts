import { syncDatabaseAutoModRule } from "@majoexe/util/database";
import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { Majobot } from "@/index";
import type { GuildSettings } from "@/util/types/Command";

export async function disableAntiBadWords(client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) {
  if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");

  const createdRule = await syncDatabaseAutoModRule(interaction.guild.id, "anti-bad-words");

  if (!createdRule) {
    return client.errorMessages.createSlashError(interaction, "❌ The anti-bad-words system is already `disabled`");
  }

  await interaction.guild.autoModerationRules.edit(createdRule.id, {
    enabled: false,
  });

  const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("⛔ Successfully `disabled` the anti-bad-words system")
    .setDescription("The anti-bad-words system has been `disabled`. Generic spam will no longer be blocked.")
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
