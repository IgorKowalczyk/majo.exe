import { ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ChatInputCommandInteraction } from "discord.js";
import type { Majobot } from "../..";

export default {
 name: "suggestion",
 description: "📝 Send a suggestion to the Majo.exe team",
 type: ApplicationCommandType.ChatInput,
 cooldown: 10000,
 dm_permission: false,
 defer: false,
 usage: "/suggestion",
 run: async (client: Majobot, interaction: ChatInputCommandInteraction) => {
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
};
