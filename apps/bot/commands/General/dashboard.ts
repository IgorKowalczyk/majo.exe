import { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ApplicationIntegrationType, InteractionContextType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "dashboard",
 description: "💻 Visit our dashboard",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/dashboard",
 run: async (client, interaction, guildSettings) => {
  try {
   if (!client.config.url) {
    const embed = new EmbedBuilder()
     .setDescription("Our dashboard is not working at the moment, please try again later!")
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     })
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("💻 Dashboard");
    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   }

   const action = new ActionRowBuilder<ButtonBuilder>() // prettier
    .addComponents(
     new ButtonBuilder() // prettier
      .setLabel("Dashboard")
      .setStyle(ButtonStyle.Link)
      .setURL(client.config.url)
    );

   const embed = new EmbedBuilder()
    .setDescription(`Click the button below or [click here](${client.config.url}) to visit our dashboard.\n\n>>> **Useful links:**\n- [View all Majo.exe commands](${client.config.url}/commands)\n- [Majo.exe support server](${client.config.url}/support)`)
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("💻 Dashboard");

   return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
