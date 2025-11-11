import { ApplicationCommandType, ApplicationIntegrationType, EmbedBuilder, InteractionContextType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
  name: "dice",
  description: "🎲 Roll a dice",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
  integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
  usage: "/dice",
  run: async (client, interaction, guildSettings) => {
    try {
      const dice = Math.floor(Math.random() * 6) + 1;

      const embed = new EmbedBuilder()
        .setTitle("🎲 Dice")
        .setDescription(`>>> **You rolled a ${dice}!**`)
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
