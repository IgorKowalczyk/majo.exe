import { ImportJSON } from "@majoexe/util/functions/files/importJSON.js";
import { ApplicationCommandType, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

const why = (await ImportJSON("why")) as string[];

export default {
 name: "why",
 description: "🤔 Get a random why question",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/why",
 run: (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   const parsed = why[Math.floor(Math.random() * why.length)];

   const embed = new EmbedBuilder()
    .setTitle("🤔 Why?")
    .setDescription(`> **${parsed}**\n\n*Some questions can be outdated or not make sense!\n Don't take them seriously!*`)
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
