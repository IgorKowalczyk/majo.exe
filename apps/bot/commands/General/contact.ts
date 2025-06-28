import { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ApplicationIntegrationType, InteractionContextType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "contact",
 description: "📝 Contact the Majo.exe team",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/contact",
 run: async (client, interaction, guildSettings) => {
  try {
   if (!client.config.url) {
    const embed = new EmbedBuilder()
     .setTitle("😢 We are sorry!")
     .setDescription("Apologies for the inconvenience, but our dashboard and contact page are currently experiencing technical difficulties. We kindly ask you to try again later.")
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     })
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("📝 Contact");
    return interaction.followUp({ embeds: [embed] });
   }

   const action = new ActionRowBuilder<ButtonBuilder>() // prettier
    .addComponents(
     new ButtonBuilder() // prettier
      .setLabel("Contact")
      .setStyle(ButtonStyle.Link)
      .setURL(`${client.config.url}/contact`),
     new ButtonBuilder() // prettier
      .setLabel("Commands")
      .setStyle(ButtonStyle.Link)
      .setURL(`${client.config.url}/commands`),
     new ButtonBuilder() // prettier
      .setLabel("Support")
      .setStyle(ButtonStyle.Link)
      .setURL(`${client.config.url}/support`)
    );

   const embed = new EmbedBuilder()
    .setDescription(
     `Click the button below or [click here](${client.config.url}/contact) to contact the Majo.exe team.\n\n>>> **Useful links:**\n- [View all Majo.exe commands](${client.config.url}/commands)\n- [Majo.exe support server](${client.config.url}/support)`
    )
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("📝 Contact");

   return interaction.followUp({ embeds: [embed], components: [action] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
