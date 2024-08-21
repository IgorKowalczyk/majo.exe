import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

export default {
 name: "cat",
 description: "🐱 Get a random cat image",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/cat",
 run: async (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
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
};
