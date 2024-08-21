import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, ChatInputCommandInteraction, User } from "discord.js";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

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
 run: async (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ Unable to get member data. Please try again.");

   const attachment = interaction.options.getAttachment("attachment");
   const user = interaction.options.getUser("user") || (interaction.member.user as User);
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
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });

   if (attachment && attachment.width && attachment.height && (attachment.width > 350 || attachment.height > 350)) {
    embed.setDescription("> ⚠️ Your attachment was resized to 350x350px because it was too big!");
   }

   return interaction.followUp({ embeds: [embed], files: [file] });
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
};
