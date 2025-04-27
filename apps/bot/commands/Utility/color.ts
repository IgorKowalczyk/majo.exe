import { invertColor } from "@majoexe/util/images";
import { createCanvas } from "@napi-rs/canvas";
import { Color, isColor } from "coloras";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, type ColorResolvable, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "color",
 description: "🎨 Display color info",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/color [color]",
 options: [
  {
   name: "color",
   description: "The color to get info about",
   required: false,
   type: ApplicationCommandOptionType.String,
   max_length: 7,
  },
 ],
 run: async (client, interaction) => {
  try {
   let color = interaction.options.getString("color") || "";

   let random = false;
   if (!color) random = true;

   if (!random && color && !color.startsWith("#")) color = `#${color}`;

   if (!random && !isColor(color).color) return client.errorMessages.createSlashError(interaction, "❌ The color you provided is invalid. The color must be in hex format. Example: `#FF0000`");

   const value = random ? "" : color;
   const colorInfo = new Color(value);
   const hex = colorInfo.toHex();

   const canvas = createCanvas(1024, 1024);
   const context = canvas.getContext("2d");
   context.beginPath();
   context.fillStyle = hex;
   context.fillRect(0, 0, canvas.width, canvas.height);
   context.closePath();

   const ic = invertColor(hex);
   context.font = "bold 132px Quicksand";
   context.fillStyle = ic;
   context.fillText(hex.toUpperCase(), canvas.width / 2 - context.measureText(hex.toUpperCase()).width / 2, canvas.height / 2 + 50);

   const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
    name: "color.png",
   });

   const embed = new EmbedBuilder()
    .setTitle(random ? `${client.config.emojis.color} Random Color` : `${client.config.emojis.color} Color: ${hex}`)

    .addFields([
     {
      name: "HEX",
      value: `> \`${hex}\``,
      inline: true,
     },
     {
      name: "RGB",
      value: `> \`${colorInfo.toRgb()}\``,
      inline: true,
     },
     {
      name: "HSL",
      value: `> \`${colorInfo.toHsl()}\``,
      inline: true,
     },
     {
      name: "HSV",
      value: `> \`${colorInfo.toHsv()}\``,
      inline: true,
     },
     {
      name: "CMYK",
      value: `> \`${colorInfo.toCmyk()}\``,
      inline: true,
     },
    ])
    .setImage("attachment://color.png")
    .setColor(colorInfo.toHex() as ColorResolvable)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });

   return interaction.followUp({ embeds: [embed], files: [file] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
