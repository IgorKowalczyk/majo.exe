import { shortenText } from "@majoexe/util/functions/util";
import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
  name: "bangladesh",
  description: "🇧🇩 I live in Bangladesh I live in Bangladesh",
  type: ApplicationCommandType.ChatInput,
  cooldown: 5000,
  contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
  integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
  usage: "/type-c [user]",
  options: [
    {
      name: "user",
      description: "User to put in Bandladesh",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  run: async (client, interaction, guildSettings) => {
    try {
      const user = interaction.options.getUser("user") || interaction.user;

      if (!user.displayAvatarURL({ size: 2048, extension: "png", forceStatic: true })) {
        return client.errorMessages.createSlashError(interaction, "❌ The user must have an avatar.");
      }

      const image = user.displayAvatarURL({
        size: 2048,
        extension: "png",
        forceStatic: true,
      });

      const [toFetch] = image.split("?");
      if (!toFetch || toFetch.length < 1) return client.errorMessages.createSlashError(interaction, "❌ The image URL is invalid.");
      const targetImage = await loadImage(toFetch);

      const background = await loadImage("./util/images/files/bangladesh.png");

      const canvas = createCanvas(background.width, background.height);
      const context = canvas.getContext("2d");

      const firstText = shortenText(user.globalName || user.username, 20) + " • 1 month ago";

      context.drawImage(background, 0, 0);
      context.save();
      context.beginPath();
      context.arc(39 + 66, 802 + 66, 66, 0, Math.PI * 2, true);
      context.closePath();
      context.clip();
      context.drawImage(targetImage, 39, 802, 132, 132);
      context.restore();
      context.font = "45px roboto-regular";

      context.fillStyle = "#494949";
      context.fillText(firstText, 205, 850);

      const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
        name: "bangladesh.png",
      });

      const embed = new EmbedBuilder()
        .setTitle("🇧🇩 Bangladesh")
        .setImage("attachment://bangladesh.png")
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
