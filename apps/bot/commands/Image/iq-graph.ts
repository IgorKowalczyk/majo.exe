import { getLines } from "@majoexe/util/images";
import { loadImage, createCanvas } from "@napi-rs/canvas";
import { ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
  name: "iq-graph",
  description: "🧠 Generate IQ graph",
  type: ApplicationCommandType.ChatInput,
  cooldown: 5000,
  contexts: [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel],
  integrationTypes: [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall],
  usage: "/iq-graph <text-1> <text-2> <text-3>",
  options: [
    {
      name: "text-1",
      description: "Text to put as first person",
      type: ApplicationCommandOptionType.String,
      required: true,
      max_length: 100,
    },
    {
      name: "text-2",
      description: "Text to put as second person",
      type: ApplicationCommandOptionType.String,
      required: true,
      max_length: 100,
    },
    {
      name: "text-3",
      description: "Text to put as third person",
      type: ApplicationCommandOptionType.String,
      required: true,
      max_length: 100,
    },
  ],
  run: async (client, interaction, guildSettings) => {
    try {
      const text1 = interaction.options.getString("text-1") || "You";
      const text2 = interaction.options.getString("text-2") || "Me";
      const text3 = interaction.options.getString("text-3") || "Them";
      const background = await loadImage("./util/images/files/iq-graph.jpg");

      const canvas = createCanvas(background.width, background.height);
      const context = canvas.getContext("2d");
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      const calculateFontSize = (text: string) => {
        const { length } = text;
        if (length <= 10) return 32;
        if (length <= 20) return 26;
        if (length <= 30) return 20;
        return 16;
      };

      const fontSize1 = calculateFontSize(text1);
      const fontSize2 = calculateFontSize(text2);
      const fontSize3 = calculateFontSize(text3);

      context.font = `${fontSize1}px Arial`;
      context.fillStyle = "#000";
      const lines1 = getLines(context, text1, 220);
      lines1.forEach((line, i) => {
        const textWidth = context.measureText(line).width;
        const x = (220 - textWidth) / 2 + 17;
        const y = 238 + (50 - fontSize1 * lines1.length) / 2 + i * fontSize1;
        context.fillText(line, x, y);
      });

      context.font = `${fontSize2}px Arial`;
      const lines2 = getLines(context, text2, 250);
      lines2.forEach((line, i) => {
        const textWidth = context.measureText(line).width;
        const x = (250 - textWidth) / 2 + 223;
        const y = 15 + (50 - fontSize2 * lines2.length) / 2 + i * fontSize2;
        context.fillText(line, x, y);
      });

      context.font = `${fontSize3}px Arial`;
      const lines3 = getLines(context, text3, 200);
      lines3.forEach((line, i) => {
        const textWidth = context.measureText(line).width;
        const x = (200 - textWidth) / 2 + 457;
        const y = 189 + (50 - fontSize3 * lines3.length) / 2 + i * fontSize3;
        context.fillText(line, x, y);
      });

      const file = new AttachmentBuilder(canvas.toBuffer("image/png"), {
        name: "iq-graph.png",
      });

      const embed = new EmbedBuilder()
        .setTitle("🧠 IQ Graph")
        .setImage("attachment://iq-graph.png")
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
