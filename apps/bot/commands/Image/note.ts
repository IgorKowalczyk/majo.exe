import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";
import { getLines } from "@majoexe/util/images";

export default {
 name: "note",
 description: "📝 Create a note",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/note <text>",
 options: [
  {
   name: "text",
   description: "Text to put in the note",
   type: ApplicationCommandOptionType.String,
   required: true,
   max_length: 256,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const text = interaction.options.getString("text");
   if (!text) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid text for the note.");
   if (text.length > 256) return client.errorMessages.createSlashError(interaction, "❌ The text must be less than 256 characters.");

   const background = await loadImage("./util/images/files/note.png");
   const canvas = createCanvas(background.width, background.height);
   const context = canvas.getContext("2d");
   context.drawImage(background, 0, 0, canvas.width, canvas.height);

   const x = text.length;
   const fontSize = Math.floor(0.0003 * (x * x) - 0.19 * x + 35.37) || 35;
   context.font = `${fontSize}px Arial`;
   context.fillStyle = "#000000";
   context.translate(425, 445);
   context.rotate(0.53);
   const lines = getLines(context, text, 160);

   lines.forEach((line, i) => {
    context.fillText(line, 0, i * fontSize);
   });

   const attachment = new AttachmentBuilder(canvas.toBuffer("image/png"), {
    name: "note.png",
   });

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("📝 Note")
    .setImage("attachment://note.png")
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
    });

   return interaction.followUp({ embeds: [embed], files: [attachment] });
  } catch (err) {
   console.log(err);
   return client.errorMessages.createSlashError(interaction, "❌ An error occurred while executing this command.");
  }
 },
} satisfies SlashCommand;
