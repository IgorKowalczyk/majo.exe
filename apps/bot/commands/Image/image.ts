/* eslint-disable complexity */
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { isColor } from "coloras";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";

const canvasSize = 510;

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
    {
      name: "round",
      description: "🖼️ Round the image corners",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "attachment",
          description: "Attachment to round",
          type: ApplicationCommandOptionType.Attachment,
          required: false,
        },
        {
          name: "user",
          description: "User avatar to round",
          type: ApplicationCommandOptionType.User,
          required: false,
        },
        {
          name: "radius",
          description: "Corner radius",
          type: ApplicationCommandOptionType.Integer,
          min_value: 1,
          max_value: 360,
          required: false,
        },
      ],
    },
    {
      name: "pixelate",
      description: "🖼️ Pixelate the image",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "attachment",
          description: "Attachment to pixelate",
          type: ApplicationCommandOptionType.Attachment,
          required: false,
        },
        {
          name: "user",
          description: "User avatar to pixelate",
          type: ApplicationCommandOptionType.User,
          required: false,
        },
        {
          name: "size",
          description: "Pixel size",
          type: ApplicationCommandOptionType.Integer,
          min_value: 1,
          max_value: 50,
          required: false,
        },
      ],
    },
    {
      name: "posterize",
      description: "🖼️ Posterize the image",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "attachment",
          description: "Attachment to posterize",
          type: ApplicationCommandOptionType.Attachment,
          required: false,
        },
        {
          name: "user",
          description: "User avatar to posterize",
          type: ApplicationCommandOptionType.User,
          required: false,
        },
        {
          name: "levels",
          description: "Number of posterization levels",
          type: ApplicationCommandOptionType.Integer,
          min_value: 2,
          max_value: 50,
          required: false,
        },
      ],
    },
    {
      name: "threshold",
      description: "🖼️ Apply threshold effect to the image",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "attachment",
          description: "Attachment to threshold",
          type: ApplicationCommandOptionType.Attachment,
          required: false,
        },
        {
          name: "user",
          description: "User avatar to threshold",
          type: ApplicationCommandOptionType.User,
          required: false,
        },
        {
          name: "level",
          description: "Threshold level (0-255)",
          type: ApplicationCommandOptionType.Integer,
          min_value: 0,
          max_value: 255,
          required: false,
        },
      ],
    },
    {
      name: "vignette",
      description: "🖼️ Apply vignette effect to the image",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "attachment",
          description: "Attachment to vignette",
          type: ApplicationCommandOptionType.Attachment,
          required: false,
        },
        {
          name: "user",
          description: "User avatar to vignette",
          type: ApplicationCommandOptionType.User,
          required: false,
        },
        {
          name: "size",
          description: "Vignette size (0-100)",
          type: ApplicationCommandOptionType.Integer,
          min_value: 0,
          max_value: 100,
          required: false,
        },
      ],
    },
    {
      name: "wavy",
      description: "🖼️ Apply wavy effect to the image",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "attachment",
          description: "Attachment to wavy",
          type: ApplicationCommandOptionType.Attachment,
          required: false,
        },
        {
          name: "user",
          description: "User avatar to wavy",
          type: ApplicationCommandOptionType.User,
          required: false,
        },
        {
          name: "amplitude",
          description: "Wave amplitude",
          type: ApplicationCommandOptionType.Integer,
          min_value: 1,
          max_value: 50,
          required: false,
        },
        {
          name: "frequency",
          description: "Wave frequency",
          type: ApplicationCommandOptionType.Integer,
          min_value: 1,
          max_value: 50,
          required: false,
        },
      ],
    },
    {
      name: "zoom",
      description: "🖼️ Zoom into the image",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "attachment",
          description: "Attachment to zoom",
          type: ApplicationCommandOptionType.Attachment,
          required: false,
        },
        {
          name: "user",
          description: "User avatar to zoom",
          type: ApplicationCommandOptionType.User,
          required: false,
        },
        {
          name: "factor",
          description: "Zoom factor (1-10)",
          type: ApplicationCommandOptionType.Integer,
          min_value: 1,
          max_value: 10,
          required: false,
        },
      ],
    },
    {
      name: "emboss",
      description: "🖼️ Apply emboss effect to the image",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "attachment",
          description: "Attachment to emboss",
          type: ApplicationCommandOptionType.Attachment,
          required: false,
        },
        {
          name: "user",
          description: "User avatar to emboss",
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
      const user = interaction.options.getUser("user") || interaction.user;
      let imageUrl;

      if (attachment) {
        if (!["image/png", "image/jpg", "image/jpeg"].includes(attachment.contentType)) {
          return client.errorMessages.createSlashError(interaction, "❌ The attachment must be a png, jpg, or jpeg file.");
        }
        imageUrl = attachment.proxyURL;
      } else {
        imageUrl = user.displayAvatarURL({ size: 2048, extension: "png", forceStatic: true });
      }

      const image = await loadImage(imageUrl);
      const canvas = createCanvas(canvasSize, canvasSize);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(image, 0, 0, canvasSize, canvasSize);

      if (subcommand === "invert") {
        const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
        for (let i = 0; i < imageData.data.length; i += 4) {
          imageData.data[i] = 255 - imageData.data[i]; // Red
          imageData.data[i + 1] = 255 - imageData.data[i + 1]; // Green
          imageData.data[i + 2] = 255 - imageData.data[i + 2]; // Blue
        }
        ctx.putImageData(imageData, 0, 0);
      } else if (subcommand === "grayscale") {
        const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
        for (let i = 0; i < imageData.data.length; i += 4) {
          const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
          imageData.data[i] = avg; // Red
          imageData.data[i + 1] = avg; // Green
          imageData.data[i + 2] = avg; // Blue
        }
        ctx.putImageData(imageData, 0, 0);
      } else if (subcommand === "sepia") {
        const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
        for (let i = 0; i < imageData.data.length; i += 4) {
          const red = imageData.data[i];
          const green = imageData.data[i + 1];
          const blue = imageData.data[i + 2];
          imageData.data[i] = red * 0.393 + green * 0.769 + blue * 0.189; // Red
          imageData.data[i + 1] = red * 0.349 + green * 0.686 + blue * 0.168; // Green
          imageData.data[i + 2] = red * 0.272 + green * 0.534 + blue * 0.131; // Blue
        }
        ctx.putImageData(imageData, 0, 0);
      } else if (subcommand === "sharpen") {
        const centerWeight = interaction.options.getInteger("radius") || 5;

        const weights = [0, -1, 0, -1, centerWeight, -1, 0, -1, 0];

        const side = Math.round(Math.sqrt(weights.length));
        const halfSide = Math.floor(side / 2);
        const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
        const src = imageData.data;
        const sw = imageData.width;
        const sh = imageData.height;
        const w = sw;
        const h = sh;
        const output = ctx.createImageData(w, h);
        const dst = output.data;

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const sy = y;
            const sx = x;
            let r = 0,
              g = 0,
              b = 0;
            for (let cy = 0; cy < side; cy++) {
              for (let cx = 0; cx < side; cx++) {
                const scy = sy + cy - halfSide;
                const scx = sx + cx - halfSide;
                if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                  const srcOffset = (scy * sw + scx) * 4;
                  const wt = weights[cy * side + cx];
                  r += src[srcOffset] * wt;
                  g += src[srcOffset + 1] * wt;
                  b += src[srcOffset + 2] * wt;
                }
              }
            }
            const dstOffset = (y * w + x) * 4;
            dst[dstOffset] = Math.min(Math.max(r, 0), 255);
            dst[dstOffset + 1] = Math.min(Math.max(g, 0), 255);
            dst[dstOffset + 2] = Math.min(Math.max(b, 0), 255);
            dst[dstOffset + 3] = src[(y * sw + x) * 4 + 3];
          }
        }

        ctx.putImageData(output, 0, 0);
      } else if (subcommand === "flip") {
        ctx.scale(-1, 1);
        ctx.drawImage(image, -canvasSize, 0, canvasSize, canvasSize);
      } else if (subcommand === "flop") {
        ctx.scale(1, -1);
        ctx.drawImage(image, 0, -canvasSize, canvasSize, canvasSize);
      } else if (subcommand === "rotate") {
        const angle = (interaction.options.getInteger("angle") || 90) * (Math.PI / 180);
        const background = interaction.options.getString("background") || "#000000";
        if (!isColor(background)) {
          return client.errorMessages.createSlashError(interaction, "❌ The background color must be a valid hex color code.");
        }
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        ctx.translate(canvasSize / 2, canvasSize / 2);
        ctx.rotate(angle);
        ctx.drawImage(image, -canvasSize / 2, -canvasSize / 2, canvasSize, canvasSize);
      } else if (subcommand === "round") {
        let radius = interaction.options.getInteger("radius") || 360;

        radius = Math.min(radius, canvasSize / 2);

        ctx.globalCompositeOperation = "destination-in";
        ctx.beginPath();

        if (radius === canvasSize / 2) {
          ctx.arc(canvasSize / 2, canvasSize / 2, radius, 0, Math.PI * 2);
        } else {
          ctx.moveTo(radius, 0);
          ctx.lineTo(canvasSize - radius, 0);
          ctx.quadraticCurveTo(canvasSize, 0, canvasSize, radius);
          ctx.lineTo(canvasSize, canvasSize - radius);
          ctx.quadraticCurveTo(canvasSize, canvasSize, canvasSize - radius, canvasSize);
          ctx.lineTo(radius, canvasSize);
          ctx.quadraticCurveTo(0, canvasSize, 0, canvasSize - radius);
          ctx.lineTo(0, radius);
          ctx.quadraticCurveTo(0, 0, radius, 0);
        }

        ctx.closePath();
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      } else if (subcommand === "pixelate") {
        const size = interaction.options.getInteger("size") || 10;
        for (let y = 0; y < canvasSize; y += size) {
          for (let x = 0; x < canvasSize; x += size) {
            const pixel = ctx.getImageData(x, y, size, size);
            let r = 0,
              g = 0,
              b = 0;
            for (let py = 0; py < pixel.height; py++) {
              for (let px = 0; px < pixel.width; px++) {
                const index = (py * pixel.width + px) * 4;
                r += pixel.data[index];
                g += pixel.data[index + 1];
                b += pixel.data[index + 2];
              }
            }
            const totalPixels = pixel.width * pixel.height;
            r = Math.floor(r / totalPixels);
            g = Math.floor(g / totalPixels);
            b = Math.floor(b / totalPixels);
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x, y, size, size);
          }
        }
      } else if (subcommand === "posterize") {
        const levels = interaction.options.getInteger("levels") || 5;
        const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
        const step = Math.floor(255 / (levels - 1));
        for (let i = 0; i < imageData.data.length; i += 4) {
          imageData.data[i] = Math.floor(imageData.data[i] / step) * step; // Red
          imageData.data[i + 1] = Math.floor(imageData.data[i + 1] / step) * step; // Green
          imageData.data[i + 2] = Math.floor(imageData.data[i + 2] / step) * step; // Blue
        }
        ctx.putImageData(imageData, 0, 0);
      } else if (subcommand === "threshold") {
        const level = interaction.options.getInteger("level") || 128;
        const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
        for (let i = 0; i < imageData.data.length; i += 4) {
          const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
          const value = avg >= level ? 255 : 0;
          imageData.data[i] = value; // Red
          imageData.data[i + 1] = value; // Green
          imageData.data[i + 2] = value; // Blue
        }
        ctx.putImageData(imageData, 0, 0);
      } else if (subcommand === "vignette") {
        const size = interaction.options.getInteger("size") || 50;
        const gradient = ctx.createRadialGradient(canvasSize / 2, canvasSize / 2, canvasSize / 2 - (canvasSize / 2) * (size / 100), canvasSize / 2, canvasSize / 2, canvasSize / 2);
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(1, "rgba(0,0,0,0.5)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasSize, canvasSize);
      } else if (subcommand === "wavy") {
        const amplitude = interaction.options.getInteger("amplitude") || 10;
        const frequency = interaction.options.getInteger("frequency") || 10;
        const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
        const tempCanvas = createCanvas(canvasSize, canvasSize);
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.putImageData(imageData, 0, 0);
        for (let y = 0; y < canvasSize; y++) {
          const offset = Math.floor(amplitude * Math.sin((2 * Math.PI * frequency * y) / canvasSize));
          ctx.drawImage(tempCanvas, 0, y, canvasSize, 1, offset, y, canvasSize, 1);
        }
      } else if (subcommand === "zoom") {
        const factor = interaction.options.getInteger("factor") || 2;
        const zoomSize = canvasSize / factor;
        const sx = (canvasSize - zoomSize) / 2;
        const sy = (canvasSize - zoomSize) / 2;
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        ctx.drawImage(image, sx, sy, zoomSize, zoomSize, 0, 0, canvasSize, canvasSize);
      } else if (subcommand === "emboss") {
        const weights = [-2, -1, 0, -1, 1, 1, 0, 1, 2];
        const side = Math.round(Math.sqrt(weights.length));
        const halfSide = Math.floor(side / 2);
        const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
        const src = imageData.data;
        const sw = imageData.width;
        const sh = imageData.height;
        const w = sw;
        const h = sh;
        const output = ctx.createImageData(w, h);
        const dst = output.data;

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const sy = y;
            const sx = x;
            let r = 0,
              g = 0,
              b = 0;
            for (let cy = 0; cy < side; cy++) {
              for (let cx = 0; cx < side; cx++) {
                const scy = sy + cy - halfSide;
                const scx = sx + cx - halfSide;
                if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                  const srcOffset = (scy * sw + scx) * 4;
                  const wt = weights[cy * side + cx];
                  r += src[srcOffset] * wt;
                  g += src[srcOffset + 1] * wt;
                  b += src[srcOffset + 2] * wt;
                }
              }
            }
            const dstOffset = (y * w + x) * 4;
            dst[dstOffset] = Math.min(Math.max(r + 128, 0), 255);
            dst[dstOffset + 1] = Math.min(Math.max(g + 128, 0), 255);
            dst[dstOffset + 2] = Math.min(Math.max(b + 128, 0), 255);
            dst[dstOffset + 3] = src[(y * sw + x) * 4 + 3];
          }
        }

        ctx.putImageData(output, 0, 0);
      }

      const buffer = canvas.toBuffer("image/png");
      const attachmentBuilder = new AttachmentBuilder(buffer, { name: "image.png" });
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

      return interaction.followUp({ embeds: [embed], files: [attachmentBuilder] });
    } catch (err) {
      console.error(err);
      return client.errorMessages.internalError(interaction, err);
    }
  },
};
