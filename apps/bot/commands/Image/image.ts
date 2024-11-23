import { isColor } from "coloras";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import sharp from "sharp";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "image",
 description: "🖼️ Edit image",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/image <command> [attachment/user]",
 options: [
  {
   name: "invert",
   description: "🖼️ Invert image colors",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to invert",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User avatar to invert",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
  {
   name: "grayscale",
   description: "🖼️ Add grayscale to image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to grayscale",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User avatar to grayscale",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
  {
   name: "sepia",
   description: "🖼️ Add sepia effect to image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to sepia",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User avatar to sepia",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
  {
   name: "blur",
   description: "🖼️ Blur the whole image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to blur",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User avatar to blur",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
    {
     name: "radius",
     description: "Blur radius",
     type: ApplicationCommandOptionType.Integer,
     min_value: 1,
     max_value: 100,
     required: false,
    },
   ],
  },
  {
   name: "sharpen",
   description: "🖼️ Sharpen the whole image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to sharpen",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User avatar to sharpen",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
    {
     name: "radius",
     description: "Sharpen radius",
     type: ApplicationCommandOptionType.Integer,
     min_value: 1,
     max_value: 100,
     required: false,
    },
   ],
  },
  {
   name: "flip",
   description: "🖼️ Flip the image (x-axis)",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to flip",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User avatar to flip",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
  {
   name: "flop",
   description: "🖼️ Flop the image (y-axis)",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to flip",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User avatar to flip",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
  {
   name: "rotate",
   description: "🖼️ Rotate the image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to flip",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User avatar to flip",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
    {
     name: "angle",
     description: "Rotate angle",
     type: ApplicationCommandOptionType.Integer,
     min_value: 1,
     max_value: 360,
     required: false,
    },
    {
     name: "background",
     description: "Background color",
     type: ApplicationCommandOptionType.String,
     required: false,
    },
   ],
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const subcommand = interaction.options.getSubcommand();
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

   const toFetch = image.split("?")[0];
   if (!toFetch || toFetch.length < 1) return client.errorMessages.createSlashError(interaction, "❌ The image URL is invalid.");
   const fetchImage = await fetch(toFetch);
   if (!fetchImage.ok) return client.errorMessages.createSlashError(interaction, "❌ The image could not be fetched.");
   const buffer = await fetchImage.arrayBuffer();

   const output = sharp(buffer).resize(510, 510, {
    withoutEnlargement: true,
    fit: "fill",
   });

   if (subcommand === "invert") {
    output.negate({ alpha: true });
   } else if (subcommand === "grayscale") {
    output.grayscale();
   } else if (subcommand === "sepia") {
    output.tint({ r: 112, g: 66, b: 20 });
   } else if (subcommand === "blur") {
    const radius = interaction.options.getInteger("radius") || 5;
    output.blur(radius);
   } else if (subcommand === "sharpen") {
    const radius = interaction.options.getInteger("radius") || 50;
    output.sharpen(radius);
   } else if (subcommand === "flip") {
    output.flip();
   } else if (subcommand === "flop") {
    output.flop();
   } else if (subcommand === "rotate") {
    const angle = interaction.options.getInteger("angle") || 90;
    const background = interaction.options.getString("background") || "#000000";
    if (!isColor(background)) return client.errorMessages.createSlashError(interaction, "❌ The background color must be a valid hex color code.");
    output.rotate(angle, { background });
   }

   const finalOutput = await output.toBuffer();

   const attachmentBuilder = new AttachmentBuilder(finalOutput, {
    name: "image.png",
   });
   const embed = new EmbedBuilder()
    .setTitle(`🖼️ Image with ${subcommand} effect`)
    .setImage("attachment://image.png")
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });

   if (attachment && attachment && attachment.width && attachment.height && (attachment.width > 510 || attachment.height > 510)) {
    embed.setDescription("> ⚠️ Your attachment was resized to 510x510px because it was too big!");
   }
   return interaction.followUp({ embeds: [embed], files: [attachmentBuilder] });
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
