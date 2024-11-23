import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";
import { shortenText } from "@majoexe/util/functions/util";

export default {
 name: "galaxy-note",
 description: "📱 Say Hi to the new Galaxy Note",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/type-c [user]",
 options: [
  {
   name: "user",
   description: "User to put as user's profile picture",
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

   const toFetch = image.split("?")[0];
   if (!toFetch || toFetch.length < 1) return client.errorMessages.createSlashError(interaction, "❌ The image URL is invalid.");
   const targetImage = await loadImage(toFetch);
   const background = await loadImage("./util/images/files/galaxy-note.png");

   const canvas = createCanvas(background.width, background.height);
   const context = canvas.getContext("2d");

   const firstText = shortenText(user.globalName || user.username, 20) + " • 24 minutes ago";

   context.drawImage(background, 0, 0);
   context.save();
   context.beginPath();
   context.arc(28 + 35, 433 + 35, 35, 0, Math.PI * 2, true);
   context.closePath();
   context.clip();
   context.drawImage(targetImage, 28, 433, 70, 70);
   context.restore();

   context.font = "32px roboto-regular";
   context.fillStyle = "#494949";
   context.fillText(firstText, 127, 462);

   const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
    name: "galaxy-note.png",
   });

   const embed = new EmbedBuilder()
    .setTitle("📱 Galaxy Note")
    .setImage("attachment://galaxy-note.png")
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
