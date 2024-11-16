import type { SlashCommand } from "@/util/types/Command";
import { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ApplicationIntegrationType, InteractionContextType } from "discord.js";

interface DonateLink {
 icon: string;
 name: string;
 url: string;
}

export default {
 name: "donate",
 description: "🪙 Help us develop Majo.exe by donating",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/donate",
 run: async (client, interaction, guildSettings) => {
  try {
   if (!client.config.donate.enabled || !client.config.donate.links) {
    const embed = new EmbedBuilder()
     .setDescription("Currently, we do not accept any donation methods! Try again later")
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     })
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle("🪙 Donate to Majo.exe");
    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   }

   const embed = new EmbedBuilder()
    .setDescription("> **You can donate to Majo.exe by using the following methods:**\n" + client.config.donate.links.map((link: DonateLink) => `- [${link.icon} ${link.name}](${link.url})`).join("\n"))
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("🪙 Donate to Majo.exe");

   const action = new ActionRowBuilder<ButtonBuilder>() // prettier
    .addComponents(
     client.config.donate.links.map((link: DonateLink) => {
      return new ButtonBuilder().setLabel(link.name).setStyle(ButtonStyle.Link).setURL(link.url).setEmoji(link.icon);
     })
    );

   return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
