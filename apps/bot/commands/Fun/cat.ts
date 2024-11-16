import type { SlashCommand } from "@/util/types/Command";
import { ActionRowBuilder, ApplicationCommandType, ApplicationIntegrationType, ButtonBuilder, ButtonStyle, EmbedBuilder, InteractionContextType } from "discord.js";

export default {
 name: "cat",
 description: "🐱 Get a random cat image",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/cat",
 run: async (client, interaction, guildSettings) => {
  try {
   const data = await fetch("https://api.thecatapi.com/v1/images/search");
   const json = await data.json();

   if (!json || !json[0]) {
    return client.errorMessages.createSlashError(interaction, "❌ No results found.");
   }

   const embed = new EmbedBuilder()
    .setTitle("🐱 Meow!")
    .setImage(json[0].url)
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
    });

   const actionRow = new ActionRowBuilder<ButtonBuilder>() // prettier
    .addComponents(
     new ButtonBuilder() // prettier
      .setStyle(ButtonStyle.Link)
      .setLabel("View image")
      .setURL(json[0].url)
    );
   return interaction.followUp({ embeds: [embed], components: [actionRow] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
