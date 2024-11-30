import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
// @ts-expect-error - No type definitions
import GIFEncoder from "gif-encoder-2";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "trigger",
 description: "😠 Generate a triggered gif from an image",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/trigger [user/attachment]",
 options: [
  {
   name: "attachment",
   description: "Attachment to trigger",
   type: ApplicationCommandOptionType.Attachment,
   required: false,
  },
  {
   name: "user",
   description: "User to trigger",
   type: ApplicationCommandOptionType.User,
   required: false,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const attachment = interaction.options.getAttachment("attachment");
   const user = interaction.options.getUser("user") || interaction.user;
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

   const [toFetch] = image.split("?");
   if (!toFetch || toFetch.length < 1) return client.errorMessages.createSlashError(interaction, "❌ The image URL is invalid.");
   const targetImage = await loadImage(toFetch);
   const background = await loadImage("./util/images/files/triggered.png");

   const gif = new GIFEncoder(256, 310, "neuquant", true);

   gif.start();
   gif.setRepeat(0);
   gif.setDelay(15);

   const canvas = createCanvas(256, 310);
   const context = canvas.getContext("2d");

   const BR = 30;
   const LR = 20;

   for (let index = 0; index < 9; index++) {
    context.clearRect(0, 0, 256, 310);

    const targetImageOffsetX = Math.floor(Math.random() * BR) - BR;
    const targetImageOffsetY = Math.floor(Math.random() * BR) - BR;
    context.drawImage(targetImage, targetImageOffsetX, targetImageOffsetY, 256 + BR, 310 - 54 + BR);

    context.fillStyle = "#FF000033";
    context.fillRect(0, 0, 256, 310);

    const backgroundOffsetX = Math.floor(Math.random() * LR) - LR;
    const backgroundOffsetY = 310 - 54 + Math.floor(Math.random() * LR) - LR;
    context.drawImage(background, backgroundOffsetX, backgroundOffsetY, 256 + LR, 54 + LR);

    gif.addFrame(context);
   }

   gif.finish();

   const file = new AttachmentBuilder(gif.out.getData(), {
    name: "triggered.gif",
   });

   const embed = new EmbedBuilder()
    .setTitle("😠 Triggered")
    .setImage("attachment://triggered.gif")
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });

   if (attachment && attachment.width && attachment.height && (attachment.width > 256 || attachment.height > 310)) {
    embed.setDescription("> ⚠️ Your attachment was resized to 256x310 pixels because it was too big!");
   }

   return interaction.followUp({ embeds: [embed], files: [file] });
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
