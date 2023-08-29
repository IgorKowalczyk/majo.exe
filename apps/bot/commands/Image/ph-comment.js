import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder } from "discord.js";

export default {
 name: "ph-comment",
 description: "🔞 Generate a Pornhub comment image",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/ph-comment <comment> [attachment/user] [username] ",
 options: [
  {
   name: "comment",
   description: "Comment of the user",
   type: ApplicationCommandOptionType.String,
   required: true,
   max_length: 256,
  },
  {
   name: "attachment",
   description: "Attachment to put as user's profile picture",
   type: ApplicationCommandOptionType.Attachment,
   required: false,
  },
  {
   name: "user",
   description: "User to put as user's profile picture",
   type: ApplicationCommandOptionType.User,
   required: false,
  },
  {
   name: "username",
   description: "Username of the user",
   type: ApplicationCommandOptionType.String,
   required: false,
   max_length: 32,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const attachment = interaction.options.getAttachment("attachment");
   const user = interaction.options.getUser("user") || interaction.member.user;
   const username = interaction.options.getString("username") || user.username;
   const comment = interaction.options.getString("comment");
   let image;

   if (attachment) {
    if (!attachment.proxyURL.endsWith(".png") && !attachment.proxyURL.endsWith(".jpg") && !attachment.proxyURL.endsWith(".jpeg")) {
     return client.errorMessages.createSlashError(interaction, "❌ The attachment must be a png, jpg, or jpeg file.");
    }
    image = attachment.proxyURL;
   } else {
    if (!user.displayAvatarURL({ size: 2048, extension: "png", forceStatic: true })) {
     return client.errorMessages.createSlashError(interaction, "❌ The user must have an avatar.");
    }
    image = user.displayAvatarURL({
     size: 128,
     extension: "png",
     forceStatic: true,
    });
   }

   const targetImage = await loadImage(image.split("?")[0]);
   const background = await loadImage("./util/images/files/ph-comment.png");

   const canvas = createCanvas(background.width, background.height);
   const context = canvas.getContext("2d");

   context.drawImage(background, 0, 0, canvas.width, canvas.height);

   context.save();
   context.beginPath();
   context.arc(25 + 25, 130 + 25, 25, 0, Math.PI * 2, true);
   context.closePath();
   context.clip();
   context.drawImage(targetImage, 25, 130, 50, 50);
   context.restore();

   context.font = "bold 16px Arial";
   context.fillStyle = "#F28705";

   const usernameWidth = context.measureText(username).width;

   context.fillText(username, 85, 160);

   context.font = "16px Arial";
   context.fillStyle = "#969696";
   context.fillText("26 minutes ago", 85 + usernameWidth + 10, 160);

   context.font = "20px Arial";
   context.fillStyle = "#c6c6c6";
   context.fillText(comment, 25, 215);

   const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
    name: "ph-comment.png",
   });

   const embed = new EmbedBuilder()
    .setTitle("🔞 PH Comment")
    .setImage("attachment://ph-comment.png")
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
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
