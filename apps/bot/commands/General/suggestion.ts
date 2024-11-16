import type { SlashCommand } from "@/util/types/Command";
import { ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ApplicationIntegrationType, InteractionContextType } from "discord.js";

export default {
 name: "suggestion",
 description: "📝 Send a suggestion to the Majo.exe team",
 type: ApplicationCommandType.ChatInput,
 cooldown: 10000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 defer: false,
 usage: "/suggestion",
 run: async (client, interaction) => {
  try {
   const modal = new ModalBuilder() // prettier
    .setCustomId("suggestion")
    .setTitle("📝 Suggestion");

   const action = new ActionRowBuilder<TextInputBuilder>() // prettier
    .addComponents(
     // prettier
     new TextInputBuilder() // prettier
      .setCustomId("suggestion")
      .setPlaceholder("Enter your suggestion here...")
      .setMinLength(5)
      .setMaxLength(500)
      .setRequired(true)
      .setStyle(TextInputStyle.Paragraph)
      .setLabel("Suggestion")
    );

   modal.addComponents(action);
   await interaction.showModal(modal);
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
