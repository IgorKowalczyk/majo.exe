import { ApplicationCommandType, CommandInteraction, EmbedBuilder } from "discord.js";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

export default {
 name: "dice",
 description: "🎲 Roll a dice",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/dice",
 run: (client: Majobot, interaction: CommandInteraction, guildSettings: GuildSettings) => {
  try {
   const dice = Math.floor(Math.random() * 6) + 1;

   const embed = new EmbedBuilder()
    .setTitle("🎲 Dice")
    .setDescription(`>>> **You rolled a ${dice}!**`)
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
