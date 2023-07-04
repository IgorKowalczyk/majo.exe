import { ApplicationCommandType, EmbedBuilder } from "discord.js";

export default {
 name: "dice",
 description: "🎲 Roll a dice",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: true,
 usage: "/dice",
 run: async (client, interaction, guildSettings) => {
  try {
   const dice = Math.floor(Math.random() * 6) + 1;

   const embed = new EmbedBuilder()
    .setTitle("🎲 Dice")
    .setDescription(`>>> **You rolled a ${dice}!**`)
    .setTimestamp()
    .setColor(guildSettings?.embedColor || client.config.global.defaultColor)
    .setThumbnail(
     interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
     })
    )
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
     }),
    });
   return interaction.followUp({ embeds: [embed] });
  } catch (err) {
   client.errorMessages.generateErrorMessage(interaction, err);
  }
 },
};
