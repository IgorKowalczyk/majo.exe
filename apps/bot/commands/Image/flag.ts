import { loadImage, createCanvas, ImageData } from "@napi-rs/canvas";
import decodeGif from "decode-gif";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
// @ts-expect-error - No type definitions
import GIFEncoder from "gif-encoder-2";
import type { SlashCommand } from "@/util/types/Command";
import { readFileSync } from "fs";

export default {
 name: "flag",
 description: "🏳️ Put a country flag on image",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
 integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
 usage: "/flag <country> [attachment/user]",
 options: [
  {
   name: "japan",
   description: "🇯🇵 Put a Japanese flag on image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to put Japanese flag",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User to put Japanese flag",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
  {
   name: "usa",
   description: "🇺🇸 Put a USA flag on image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to put USA flag",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User to put USA flag",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
  {
   name: "russia",
   description: "🇷🇺 Put a Russian flag on image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to put Russian flag",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User to put Rusian flag",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
  {
   name: "germany",
   description: "🇩🇪 Put a German flag on image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to put German flag",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User to put German flag",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
  {
   name: "poland",
   description: "🇵🇱 Put a Polish flag on image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to put Polish flag",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User to put Polish flag",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
  {
   name: "uk",
   description: "🇬🇧 Put a UK flag on image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to put UK flag",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User to put UK flag",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
  {
   name: "ukraine",
   description: "🇺🇦 Put a Ukrainian flag on image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to put Ukrainian flag",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User to put Ukrainian flag",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const countryFlags: { [key: string]: string } = {
    japan: "🇯🇵",
    usa: "🇺🇸",
    russia: "🇷🇺",
    germany: "🇩🇪",
    ukraine: "🇺🇦",
    uk: "🇬🇧",
    poland: "🇵🇱",
   };
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
   const targetImage = await loadImage(toFetch);
   const background = readFileSync(`./util/images/files/${subcommand}.gif`);
   const backgroundData = new Uint8Array(background);

   if (!backgroundData || backgroundData.length < 1) return client.errorMessages.createSlashError(interaction, "❌ The background data is undefined.");
   const height = backgroundData[6] + backgroundData[7] * 256;
   const width = backgroundData[8] + backgroundData[9] * 256;

   const gif = new GIFEncoder(width, height, "neuquant", true);
   gif.start();
   gif.setQuality(1);
   gif.setDelay(40);
   gif.setDispose(2);
   gif.setRepeat(0);

   const canvas = createCanvas(width, height);
   const context = canvas.getContext("2d");

   const { frames } = decodeGif(backgroundData);

   for (let i = 0; i < frames.length; i++) {
    context.globalAlpha = 1;
    const frame = frames[i];
    if (frame) {
     const imageData = new ImageData(frame.data, width, height);
     // @ts-expect-error - Invalid types in napi-rs/canvas
     context.putImageData(imageData, 0, 0);
    }
    context.globalAlpha = 0.5;
    context.drawImage(targetImage, 0, 0, width, height);
    gif.addFrame(context);
   }

   gif.finish();

   const file = new AttachmentBuilder(gif.out.getData(), {
    name: "flag.gif",
   });

   const embed = new EmbedBuilder()
    .setTitle(`${countryFlags[subcommand]} ${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)}`)
    .setImage("attachment://flag.gif")
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });

   if (attachment && attachment && attachment.width && attachment.height && (attachment.width > 512 || attachment.height > 512)) {
    embed.setDescription("⚠️ Your attachment was resized to 510x510px because it was too big.");
   }

   return interaction.followUp({ embeds: [embed], files: [file] });
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
