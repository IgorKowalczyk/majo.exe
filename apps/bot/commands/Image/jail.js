import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder } from "discord.js";

export default {
 name: "jail",
 description: "🔐 Put someone in jail",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/jail [user/attachment]",
 options: [
  {
   name: "attachment",
   description: "Attachment to jail",
   type: ApplicationCommandOptionType.Attachment,
   required: false,
  },
  {
   name: "user",
   description: "User to put in jail",
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
   const background = await loadImage("./util/images/files/jail.png");

   const canvas = createCanvas(350, 350);
   const context = canvas.getContext("2d");

   context.drawImage(targetImage, 0, 0, canvas.width, canvas.height);
   context.drawImage(background, 0, 0, canvas.width, canvas.height);

   const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
    name: "jail.png",
   });

   const embed = new EmbedBuilder()
    .setTitle("🔐 Jail")
    .setImage("attachment://jail.png")
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
