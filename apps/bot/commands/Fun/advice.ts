import advices from "@majoexe/util/content/advices.json";
import { ApplicationCommandType, ApplicationIntegrationType, EmbedBuilder, InteractionContextType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
  name: "advice",
  description: "🤌 Get a random helpful advice",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
  integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
  usage: "/advice",
  run: async (client, interaction, guildSettings) => {
    try {
      const parsed = advices[Math.floor(Math.random() * advices.length)];
      if (!parsed) return client.errorMessages.createSlashError(interaction, "❌ Failed to fetch advice. Please try again later.");

      const embed = new EmbedBuilder()
        .setTitle("🤌 My advice is:")
        .setDescription(`>>> **${parsed.advice}**`)
        .setTimestamp()
        .setColor(guildSettings?.embedColor || client.config.defaultColor)
        .setThumbnail(interaction.user.displayAvatarURL({ size: 256 }))
        .setFooter({
          text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL({ size: 256 }),
        });
      return interaction.followUp({ embeds: [embed] });
    } catch (err) {
      client.errorMessages.internalError(interaction, err);
    }
  },
} satisfies SlashCommand;
