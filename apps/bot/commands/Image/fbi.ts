import { loadImage, createCanvas } from "canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

export default {
 name: "fbi",
 description: "🚨 Why FBI is here?",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/fbi [text]",
 options: [
  {
   name: "text",
   description: "Text to put in the image",
   type: ApplicationCommandOptionType.String,
   required: true,
   max_length: 120,
  },
 ],
 run: async (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   const text = interaction.options.getString("text");
   if (!text) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid text to put on the image.");

   const background = await loadImage("./util/images/files/why-fbi-here.png");
   const overlay = await loadImage("./util/images/files/why-fbi-here-overlay.png");
   const canvas = createCanvas(background.width, background.height);
   const context = canvas.getContext("2d");
   context.drawImage(background, 0, 0, canvas.width, canvas.height);

   context.font = "30px Arial";
   context.fillText(text, 40, 290);

   context.drawImage(overlay, 627, 0, overlay.width, overlay.height);

   const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
    name: "why-fbi-here.png",
   });

   const embed = new EmbedBuilder()
    .setTitle("🚨 Why is the FBI here?")
    .setImage("attachment://why-fbi-here.png")
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });

   return interaction.followUp({ embeds: [embed], files: [file] });
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
};
