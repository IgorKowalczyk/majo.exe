import { getLines } from "@majoexe/util/images";
import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
  name: "dog-say",
  description: "🐶 Make a dog say something, oh...",
  type: ApplicationCommandType.ChatInput,
  cooldown: 5000,
  contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
  integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
  usage: "/dog-say [text]",
  options: [
    {
      name: "text",
      description: "Text to say",
      type: ApplicationCommandOptionType.String,
      required: true,
      max_length: 55,
    },
  ],
  run: async (client, interaction, guildSettings) => {
    try {
      const text = interaction.options.getString("text");
      if (!text) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid text for the dog to say.");

      const background = await loadImage("./util/images/files/dog.png");
      const canvas = createCanvas(background.width, background.height);
      const context = canvas.getContext("2d");
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      const fontSize = 32;

      context.font = `${fontSize}px 'Arial'`;
      context.fillStyle = "#000000";

      context.translate(350, 50);
      const lines = getLines(context, text, 275);

      for (let i = 0; i < lines.length; i++) {
        if (lines[i]) {
          context.fillText(lines[i] as string, 0, i * fontSize);
        }
      }

      const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
        name: "dog-say.png",
      });

      const embed = new EmbedBuilder()
        .setTitle("🐶 Dog Say")
        .setImage("attachment://dog-say.png")
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
