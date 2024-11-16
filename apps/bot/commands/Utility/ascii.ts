import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, AttachmentBuilder, ApplicationIntegrationType, InteractionContextType } from "discord.js";
import figlet from "figlet";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "ascii",
 description: "✍️ Convert text to ASCII",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/ascii <text>",
 options: [
  {
   name: "text",
   description: "The text to convert",
   required: true,
   type: ApplicationCommandOptionType.String,
   max_length: 500,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const text = interaction.options.getString("text");
   if (!text) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid text to convert.");

   figlet(text, (err, data) => {
    if (err) {
     return client.errorMessages.createSlashError(interaction, "❌ An error occurred while converting the text to ASCII");
    }

    const embed = new EmbedBuilder()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setTimestamp()
     .setTitle(`${client.config.emojis.success} Your ascii code has been successfully generated!`)
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({
       size: 256,
      }),
     });

    const attached = new AttachmentBuilder(Buffer.from(data ?? "").toString()).setName("ascii.txt").setFile(data ?? "");
    return interaction.followUp({ ephemeral: false, embeds: [embed], files: [attached] });
   });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
