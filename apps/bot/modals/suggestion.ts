import prismaClient from "@majoexe/database";
import { cacheGet, cacheSet, cacheTTL } from "@majoexe/database/redis";
import { formatDuration } from "@majoexe/util/functions/util";
import { EmbedBuilder, MessageFlags, type ModalMessageModalSubmitInteraction } from "discord.js";
import type { Majobot } from "..";

export default {
  id: "suggestion",
  run: async (client: Majobot, interaction: ModalMessageModalSubmitInteraction) => {
    if (!interaction.guild) return;

    await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });
    const suggestion = interaction.fields.getTextInputValue("suggestion");
    if (suggestion.length < 5 || suggestion.length > 500) {
      const embed = new EmbedBuilder()
        .setTitle("‼️ Your suggestion must be between 5 and 500 characters!")
        .setDescription("Please make sure your suggestion is between 5 and 500 characters!")
        .setColor("#EF4444")
        .setTimestamp()
        .setFooter({
          text: `Suggested by ${interaction.user.globalName || interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL({
            size: 256,
          }),
        });

      return interaction.followUp({ flags: [MessageFlags.Ephemeral], embeds: [embed] });
    }

    const key = `user:${interaction.user.id}:suggestion`;
    const timeout = await cacheGet(key);

    if (timeout) {
      const timeLeft = await cacheTTL(key);

      const embed = new EmbedBuilder()
        .setTitle("‼️ You are on cooldown!")
        .setDescription(`You are on cooldown for \`${formatDuration(timeLeft * 1000)}\`! Please wait before suggesting again!`)
        .setColor("#EF4444")
        .setTimestamp()
        .setFooter({
          text: `Suggested by ${interaction.user.globalName || interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL({
            size: 256,
          }),
        });

      return interaction.followUp({ flags: [MessageFlags.Ephemeral], embeds: [embed] });
    }

    await cacheSet(key, { userId: interaction.user.id, time: Date.now() }, 60); // 1 minute

    const embed = new EmbedBuilder()
      .setTitle("📝 Thank you for your suggestion!")
      .setDescription(`**Suggestion**: ${suggestion}`)
      .setColor("#3B82F6")
      .setTimestamp()
      .setFooter({
        text: `Suggested by ${interaction.user.globalName || interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
          size: 256,
        }),
      });

    await prismaClient.suggestions.create({
      data: {
        message: suggestion,
        userId: interaction.user.id,
        guildId: interaction.guild.id,
      },
    });

    return interaction.followUp({ flags: [MessageFlags.Ephemeral], embeds: [embed] });
  },
};
