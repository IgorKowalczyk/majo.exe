import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, AttachmentBuilder } from "discord.js";
import QRCode from "qrcode";

export default {
 name: "qrcode",
 description: "📱 Generate a QR code",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
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
     text: `Requested by ${interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({ size: 256 }),
    });
   return interaction.followUp({ embeds: [embed], files: [attachment] });
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
};
