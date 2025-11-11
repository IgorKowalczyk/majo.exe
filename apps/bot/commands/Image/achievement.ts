import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
  name: "achievement",
  description: "🏆 Generate a achievement image",
  type: ApplicationCommandType.ChatInput,
  cooldown: 5000,
  contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
  integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
  usage: "/achievement <text>",
  options: [
    {
      name: "text",
      description: "Text to put in achievement",
      type: ApplicationCommandOptionType.String,
      required: false,
      max_length: 50,
    },
  ],
  run: async (client, interaction, guildSettings) => {
    try {
      const text = interaction.options.getString("text") || "How Did We Get Here?";
      const background = await loadImage("./util/images/files/achievement.png");

      const canvas = createCanvas(background.width, background.height);
      const context = canvas.getContext("2d");
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      context.translate(120, 60);
      context.font = "24px Arial";
      context.fillStyle = "#c2c2c2";
      context.fillText(text, 10, 22, 330);

      const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
        name: "achievement.png",
      });

      const embed = new EmbedBuilder()
        .setTitle("🏆 Achievement")
        .setImage("attachment://achievement.png")
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
