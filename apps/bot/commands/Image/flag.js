import { loadImage, createCanvas, ImageData } from "@napi-rs/canvas";
import decodeGif from "decode-gif";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder } from "discord.js";
import GIFEncoder from "gif-encoder-2";

export default {
 name: "flag",
 description: "🏳️ Put country flag on image",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/flag <country> [attachment/user]",
 options: [
  {
   name: "japan",
   description: "🇯🇵 Put Japan flag on image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to put Japan flag",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User to put Japan flag",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
  {
   name: "america",
   description: "🇺🇸 Put American flag on image",
   type: ApplicationCommandOptionType.Subcommand,
   options: [
    {
     name: "attachment",
     description: "Attachment to put American flag",
     type: ApplicationCommandOptionType.Attachment,
     required: false,
    },
    {
     name: "user",
     description: "User to put American flag",
     type: ApplicationCommandOptionType.User,
     required: false,
    },
   ],
  },
  {
   name: "russia",
   description: "🇷🇺 Put Russian flag on image",
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
   description: "🇩🇪 Put German flag on image",
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
   description: "🇵🇱 Put Polish flag on image",
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
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const subcommand = interaction.options.getSubcommand();
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
   const background = await loadImage(`./util/images/files/${subcommand}.gif`);

   const gif = new GIFEncoder(background.width, background.height, "neuquant", true);
   gif.start();
   gif.setQuality(1);
   gif.setDelay(40);
   gif.setDispose(2);
   gif.setRepeat(0);

   const canvas = createCanvas(background.width, background.height);
   const context = canvas.getContext("2d");
   context.quality = "fast";
   context.patternQuality = "fast";

   const frames = decodeGif(background.src).frames;

   for (let i = 0; i < frames.length; i++) {
    context.globalAlpha = 1;
    const frame = frames[i];
    const imageData = new ImageData(frame.data, background.width, background.height);
    context.putImageData(imageData, 0, 0);
    context.globalAlpha = 0.5;
    context.drawImage(targetImage, 0, 0, background.width, background.height);
    gif.addFrame(context);
   }

   gif.finish();

   const file = new AttachmentBuilder(gif.out.getData(), {
    name: "flag.gif",
   });

   const embed = new EmbedBuilder()
    .setTitle(`🏳️ ${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)}`)
    .setImage("attachment://flag.gif")
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
