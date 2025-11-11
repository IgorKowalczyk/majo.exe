import { EmbedBuilder, time, ButtonBuilder, ActionRowBuilder, ApplicationCommandType, ButtonStyle, ApplicationIntegrationType, InteractionContextType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
  name: "uptime",
  description: "⌛ View Majo.exe bot uptime and past status",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
  integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
  usage: "/uptime",
  run: async (client, interaction, guildSettings) => {
    try {
      if (!client.user) return client.errorMessages.createSlashError(interaction, "❌ Bot is not ready yet. Please try again later.");

      const embed = new EmbedBuilder()
        .setTitle("📈 Majo.exe uptime")
        .setDescription(
          `**🚀 Date launched**: ${client.readyAt ? time(client.readyAt) : "Unknown"}
    **⏱️ Started:** ${client.readyAt ? time(client.readyAt, "R") : "Unknown"}
     
     **✨ Did you know?** From the time Majo.exe was launched it served \`${client.commandsRan}\` commands!
     `
        )
        .setTimestamp()
        .setColor(guildSettings?.embedColor || client.config.defaultColor)
        .setFooter({
          text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL({
            size: 256,
          }),
        });

      if (client.config.url) {
        const action = new ActionRowBuilder<ButtonBuilder>() // prettier
          .addComponents(
            new ButtonBuilder() // prettier
              .setLabel("Status page")
              .setStyle(ButtonStyle.Link)
              .setURL(`${client.config.url}/status`)
          );
        return interaction.followUp({ embeds: [embed], components: [action] });
      } else {
        return interaction.followUp({ embeds: [embed] });
      }
    } catch (err) {
      client.errorMessages.internalError(interaction, err);
    }
  },
} satisfies SlashCommand;
