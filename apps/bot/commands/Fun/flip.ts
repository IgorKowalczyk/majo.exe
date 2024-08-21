import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
import { flipText } from "@majoexe/util/functions/util";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

export default {
 name: "flip",
 description: "🔁 Flip text (upside down) or 🪙 Flip coin (heads or tails)",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/flip <coin | text>",
 options: [
  {
   name: "coin",
   description: "🪙 Flip coin (heads or tails)",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/flip coin",
  },
  {
   name: "text",
   description: "🔁 Flip text (upside down)",
   type: ApplicationCommandOptionType.Subcommand,
   usage: "/flip text",
   options: [
    {
     name: "text",
     description: "Text to flip",
     required: true,
     type: ApplicationCommandOptionType.String,
     max_length: 100,
    },
   ],
  },
 ],
 run: (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   if (interaction.options.getSubcommand() == "coin") {
    const coin = Math.floor(Math.random() * 2) + 1;
    const embed = new EmbedBuilder()
     .setTitle("🪙 Coin Flip")
     .setDescription(`>>> **You flipped a ${coin == 1 ? "heads" : "tails"}!**`)
     .setTimestamp()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setThumbnail(interaction.user.displayAvatarURL({ size: 256 }))
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({ size: 256 }),
     });
    return interaction.followUp({ embeds: [embed] });
   } else if (interaction.options.getSubcommand() == "text") {
    const text = interaction.options.getString("text");
    if (!text) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid text to flip.");

    const embed = new EmbedBuilder()
     .setTitle("🔁 Flipped Text")
     .setDescription(`>>> **${flipText(text)}**`)
     .setTimestamp()
     .setColor(guildSettings?.embedColor || client.config.defaultColor)
     .setThumbnail(interaction.user.displayAvatarURL({ size: 256 }))
     .setFooter({
      text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL({ size: 256 }),
     });
    return interaction.followUp({ embeds: [embed] });
   }
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
