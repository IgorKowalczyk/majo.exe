import { getLines } from "@majoexe/util/images";
import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "change-my-mind",
 description: "🤔 Change my mind",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/change-my-mind [text]",
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

   const background = await loadImage("./util/images/files/change-my-mind.png");
   const canvas = createCanvas(background.width, background.height);
   const context = canvas.getContext("2d");
   context.drawImage(background, 0, 0, canvas.width, canvas.height);

   // Inspired by https://github.com/jgoralcz/image-microservice/blob/dev/src/workers/canvas/ChangeMyMind.js

   const x = text.length;
   let fontSize = 70;
   const maxX = 780;
   const startX = 260;
   const startY = 580;

   context.translate(startX + 25, startY);

   context.rotate((1 * Math.PI) / 180);

   if (x <= 30) {
    fontSize = 50;
   } else if (x <= 70) {
    fontSize = 40;
   } else if (x <= 85) {
    fontSize = 32;
   } else if (x < 100) {
    fontSize = 26;
   } else if (x <= 120) {
    fontSize = 21;
   }

   context.font = `${fontSize}px 'Quicksand'`;
   context.fillStyle = "#000000";

   const lines = getLines(context, text, maxX - startX);

   for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i] as string, 10, i * fontSize + 10);
   }

   const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
    name: "change-my-mind.png",
   });

   const embed = new EmbedBuilder()
    .setTitle("🤔 Change my mind")
    .setImage("attachment://change-my-mind.png")
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
} satisfies SlashCommand;
