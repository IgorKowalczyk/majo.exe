import { ImportJSON } from "@majoexe/util/json";
import { ApplicationCommandType, EmbedBuilder } from "discord.js";

const why = await ImportJSON("why");

export default {
 name: "why",
 description: "🤔 Get a random why question",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/why",
 run: async (client, interaction, guildSettings) => {
  try {
   const parsed = why[Math.floor(Math.random() * why.length)];

   const embed = new EmbedBuilder()
    .setTitle("🤔 Why?")
    .setDescription(`> **${parsed}**\n\n*Some questions can be outdated or not make sense!\n Don't take them seriously!*`)
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setThumbnail(interaction.member.user.displayAvatarURL({ size: 256 }))
    .setFooter({
     text: `Requested by ${interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({ size: 256 }),
    });
   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
