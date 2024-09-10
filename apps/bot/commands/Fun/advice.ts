import { ImportJSON } from "@majoexe/util/functions/files/importJSON.js";
import { ApplicationCommandType, EmbedBuilder, type ChatInputCommandInteraction } from "discord.js";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

const advices = (await ImportJSON("advices")) as {
 id: number;
 advice: string;
}[];

export default {
 name: "advice",
 description: "🤌 Get a random helpful advice",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/advice",
 run: (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   const parsed = advices[Math.floor(Math.random() * advices.length)];

   const embed = new EmbedBuilder()
    .setTitle("🤌 My advice is:")
    .setDescription(`>>> **${parsed.advice}**`)
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setThumbnail(interaction.user.displayAvatarURL({ size: 256 }))
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
    });
   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
