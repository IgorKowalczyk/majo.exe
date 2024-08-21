import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, type ChatInputCommandInteraction } from "discord.js";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

export default {
 name: "letmegpt",
 description: "🔍 Let me GPT that for you",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
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
 run: (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
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
};
