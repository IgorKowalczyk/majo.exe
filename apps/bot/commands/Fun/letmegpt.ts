import type { SlashCommand } from "@/util/types/Command";
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ApplicationIntegrationType, InteractionContextType } from "discord.js";

export default {
 name: "letmegpt",
 description: "🔍 Let me GPT that for you",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/lmgtfy <query>",
 options: [
  {
   name: "query",
   description: "Search query",
   required: true,
   type: ApplicationCommandOptionType.String,
   max_length: 256,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const query = interaction.options.getString("query");
   if (!query) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid search query.");

   const embed = new EmbedBuilder()
    .setTitle("🔍 Let me GPT that for you")
    .setDescription(`>>> https://letmegpt.com/search?q=${encodeURIComponent(query)}`)
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
    });

   const row = new ActionRowBuilder<ButtonBuilder>() // prettier
    .addComponents(
     new ButtonBuilder() // prettier
      .setLabel("Search")
      .setEmoji("🔍")
      .setStyle(ButtonStyle.Link)
      .setURL(`https://letmegpt.com/search?q=${encodeURIComponent(query)}`)
    );

   return interaction.followUp({ embeds: [embed], components: [row] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
