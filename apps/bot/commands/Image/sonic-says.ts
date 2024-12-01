import { getLines } from "@majoexe/util/images";
import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "sonic-says",
 description: "🦔 Sonic says",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/sonic-says <text>",
 options: [
  {
   name: "text",
   description: "Text to put on the sign",
   type: ApplicationCommandOptionType.String,
   required: true,
   max_length: 120,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const text = interaction.options.getString("text");
   if (!text) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid text to put on the sign.");

   const background = await loadImage("./util/images/files/sonic-says.png");
   const canvas = createCanvas(background.width, background.height);
   const context = canvas.getContext("2d");
   context.drawImage(background, 0, 0, canvas.width, canvas.height);

   const fontSize = 42;

   context.font = `bold ${fontSize}px 'Quicksand'`;
   context.fillStyle = "#ffffff";

   const lines = getLines(context, text, 500);
   lines.forEach((line, i) => {
    context.fillText(line, 260, 200 + i * fontSize);
   });

   const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
    name: "sonic-says.png",
   });

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("🦔 Sonic Says")
    .setImage("attachment://sonic-says.png")
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
    });

   return interaction.followUp({ embeds: [embed], files: [file] });
  } catch (err) {
   console.log(err);
   return client.errorMessages.createSlashError(interaction, "❌ An error occurred while executing this command.");
  }
 },
} satisfies SlashCommand;
