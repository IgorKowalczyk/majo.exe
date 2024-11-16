import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, AttachmentBuilder, ApplicationIntegrationType, InteractionContextType } from "discord.js";
import QRCode from "qrcode";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "qrcode",
 description: "📱 Generate a QR code",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/qrcode <text>",
 options: [
  {
   name: "text",
   description: "Text to generate QR code",
   required: true,
   type: ApplicationCommandOptionType.String,
   max_length: 512,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const text = interaction.options.getString("text");
   if (!text) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid text to generate a QR code.");

   const qrCode = await QRCode.toDataURL(text);

   const attachment = new AttachmentBuilder(Buffer.from(qrCode.split(",")[1], "base64"), {
    name: "qrcode.png",
   });

   const embed = new EmbedBuilder()
    .setTitle("📱 QR Code")
    .setDescription(`>>> **QR Code for \`${text}\`**`)
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setImage("attachment://qrcode.png")
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
    });
   return interaction.followUp({ embeds: [embed], files: [attachment] });
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
