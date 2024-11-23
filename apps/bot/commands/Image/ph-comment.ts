import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "ph-comment",
 description: "🔞 Generate a PH comment image",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
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
   const user = interaction.options.getUser("user") || interaction.user;
   const username = interaction.options.getString("username") || user.username;
   const comment = interaction.options.getString("comment");
   if (!comment) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid comment for the user.");

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
     size: 128,
     extension: "png",
     forceStatic: true,
    });
   }

   const toFetch = image.split("?")[0];
   if (!toFetch || toFetch.length < 1) return client.errorMessages.createSlashError(interaction, "❌ The image URL is invalid.");
   const targetImage = await loadImage(toFetch);
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
