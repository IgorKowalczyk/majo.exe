import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder } from "discord.js";

export default {
 name: "trash",
 description: "🗑️ Put someone or something in the trash",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/trash [user/attachment]",
 options: [
  {
   name: "attachment",
   description: "Attachment to trash",
   type: ApplicationCommandOptionType.Attachment,
   required: false,
  },
  {
   name: "user",
   description: "User to put in trash",
   type: ApplicationCommandOptionType.User,
   required: false,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const attachment = interaction.options.getAttachment("attachment");
   const user = interaction.options.getUser("user") || interaction.member.user;
   let image;

   if (attachment) {
    if (attachment.contentType !== "image/png" && attachment.contentType !== "image/jpg" && attachment.contentType !== "image/jpeg") {
     return client.errorMessages.createSlashError(interaction, "❌ The attachment must be a png, jpg, or jpeg file.");
    }
    image = attachment.proxyURL;
   } else {
    if (!user.displayAvatarURL({ size: 2048, extension: "png", forceStatic: true })) {
     return client.errorMessages.createSlashError(interaction, "❌ The user must have an avatar.");
    }
    image = user.displayAvatarURL({
     size: 2048,
     extension: "png",
     forceStatic: true,
    });
   }

   const targetImage = await loadImage(image.split("?")[0]);
   const background = await loadImage("./util/images/files/trash.png");

   const canvas = createCanvas(background.width, background.height);
   const context = canvas.getContext("2d");

   context.drawImage(background, 0, 0);
   context.drawImage(targetImage, 309, 0, 309, 309);

   const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
    name: "trash.png",
   });

   const embed = new EmbedBuilder()
    .setTitle("🗑️ Trash")
    .setImage("attachment://trash.png")
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    });

   if (attachment && (attachment.width > 309 || attachment.height > 309)) {
    embed.setDescription("> ⚠️ Your attachment was resized to 309x309 pixels because it was too big!");
   }

   return interaction.followUp({ embeds: [embed], files: [file] });
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
};
