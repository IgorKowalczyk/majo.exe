import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";
import { shortenText } from "@majoexe/util/functions/util";

export default {
 name: "type-c",
 description: "⚡ Type C for fast charging",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/type-c [user]",
 options: [
  {
   name: "user",
   description: "User to put in the image",
   type: ApplicationCommandOptionType.User,
   required: false,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const user = interaction.options.getUser("user") || interaction.user;
   let image;

   if (!user.displayAvatarURL({ size: 2048, extension: "png", forceStatic: true })) {
    return client.errorMessages.createSlashError(interaction, "❌ The user must have an avatar.");
   }

   image = user.displayAvatarURL({
    size: 2048,
    extension: "png",
    forceStatic: true,
   });

   const targetImage = await loadImage(image.split("?")[0]);
   const background = await loadImage("./util/images/files/type-c.jpg");

   const canvas = createCanvas(background.width, background.height);
   const context = canvas.getContext("2d");

   const firstText = user.globalName || user.username;

   context.drawImage(background, 0, 0);
   context.save();
   context.beginPath();
   context.arc(27 + 72, 1113 + 72, 72, 0, Math.PI * 2, true);
   context.closePath();
   context.clip();
   context.drawImage(targetImage, 28, 1114, 145, 145);
   context.restore();
   context.font = "42px helvetica-neue-regular";
   const firstTextWidth = context.measureText(firstText).width;

   context.font = "36px helvetica-neue-regular";
   const secondText = `@${user.username} ∙ 5m ago`;
   const secondTextWidth = context.measureText(secondText).width;

   const totalWidth = firstTextWidth + secondTextWidth + 20;

   const maxWidth = 700;
   if (totalWidth > maxWidth) {
    const scale = maxWidth / totalWidth;

    context.font = `${Math.floor(42 * scale)}px helvetica-neue-regular`;
    context.fillStyle = "#fcffff";
    context.fillText(firstText, 195, 1150);

    context.font = `${Math.floor(36 * scale)}px helvetica-neue-regular`;
    context.fillStyle = "#63717e";
    context.fillText(secondText, 195 + firstTextWidth * scale + 20, 1150);
   } else {
    context.font = "42px helvetica-neue-regular";
    context.fillStyle = "#fcffff";
    context.fillText(firstText, 195, 1150);

    context.font = "36px helvetica-neue-regular";
    context.fillStyle = "#63717e";
    context.fillText(secondText, 195 + firstTextWidth + 20, 1150);
   }

   const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
    name: "type-c.png",
   });

   const embed = new EmbedBuilder()
    .setTitle("⚡ Enabled Fast Charging!")
    .setImage("attachment://type-c.png")
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
