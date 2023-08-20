import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder } from "discord.js";
import GIFEncoder from "gifencoder";

export default {
 name: "trigger",
 description: "😠 Generate a triggered gif from an image",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/trigger [user]",
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
   const user = interaction.options.getUser("user") || interaction.member.user;
   let image;

   if (attachment) {
    if (!attachment.proxyURL.endsWith(".png") && !attachment.proxyURL.endsWith(".jpg") && !attachment.proxyURL.endsWith(".jpeg")) {
     return client.errorMessages.createSlashError(interaction, "❌ The attachment must be a png, jpg, or jpeg file.");
    }
    image = attachment.proxyURL;
   } else {
    image = user.displayAvatarURL({
     size: 2048,
     extension: "png",
     forceStatic: true,
    });
   }

   const targetImage = await loadImage(image.split("?")[0]);
   const background = await loadImage("./util/images/files/triggered.png");

   const gif = new GIFEncoder(256, 310);

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
     text: `Requested by ${interaction.member.user.username}`,
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
