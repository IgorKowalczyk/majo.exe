import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
  name: "trash",
  description: "🗑️ Put someone or something in the trash",
  type: ApplicationCommandType.ChatInput,
  cooldown: 5000,
  contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
  integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
  usage: "/trash [user/attachment]",
  options: [
    {
      name: "attachment",
      description: "Attachment to trash",
      type: ApplicationCommandOptionType.Attachment,
      required: false,
    },
    {
      name: "user",
      description: "User to put in trash",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  run: async (client, interaction, guildSettings) => {
    try {
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

      const [toFetch] = image.split("?");
      if (!toFetch || toFetch.length < 1) return client.errorMessages.createSlashError(interaction, "❌ The image URL is invalid.");
      const targetImage = await loadImage(toFetch);
      const background = await loadImage("./util/images/files/trash.png");

      const canvas = createCanvas(background.width, background.height);
      const context = canvas.getContext("2d");

      context.drawImage(background, 0, 0);
      context.drawImage(targetImage, 309, 0, 309, 309);

      const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
        name: "trash.png",
      });

      const embed = new EmbedBuilder()
        .setTitle("🗑️ Trash")
        .setImage("attachment://trash.png")
        .setColor(guildSettings?.embedColor || client.config.defaultColor)
        .setTimestamp()
        .setFooter({
          text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL({
            size: 256,
          }),
        });

      if (attachment && attachment.width && attachment.height && (attachment.width > 309 || attachment.height > 309)) {
        embed.setDescription("> ⚠️ Your attachment was resized to 309x309 pixels because it was too big!");
      }

      return interaction.followUp({ embeds: [embed], files: [file] });
    } catch (err) {
      console.log(err);
      client.errorMessages.internalError(interaction, err);
    }
  },
} satisfies SlashCommand;
