import { EmbedBuilder } from "discord.js";

/**
 * @param client Discord Client
 * @param interaction Discord Interaction
 * @param color Embed color
 * @returns {Promise<void>}
 * */
export async function PauseGiveaway(client, interaction, color) {
 try {
  await interaction.deferReply({ ephemeral: true });
  const query = interaction.options.getString("query");
  const giveaway = client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

  if (!giveaway) {
   const embed = new EmbedBuilder()
    .setColor("#EF4444")
    .setTimestamp()
    .setTitle("❌ Error")
    .setDescription(`> No giveaway found for \`${query}\`!`)
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   return interaction.followUp({ ephemeral: true, embeds: [embed] });
  }

  if (giveaway.ended) {
   const embed = new EmbedBuilder()
    .setColor("#EF4444")
    .setTimestamp()
    .setTitle("❌ Error")
    .setDescription(`> Giveaway \`${query}\` has already paused!`)
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   return interaction.followUp({ ephemeral: true, embeds: [embed] });
  }

  try {
   await client.giveawaysManager.pause(giveaway.messageId);
  } catch (err) {
   const embed = new EmbedBuilder()
    .setColor("#EF4444")
    .setTimestamp()
    .setTitle("❌ Error")
    .setDescription(`> ${err}`)
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   return interaction.followUp({ ephemeral: true, embeds: [embed] });
  }

  const embed = new EmbedBuilder()
   .setDescription(`${client.botEmojis.sparkles} | Success! Giveaway \`${query}\` paused!`)
   .setColor(color)
   .setFooter({
    text: `Requested by ${interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   });
  return interaction.followUp({ embeds: [embed], ephemeral: true });
 } catch (err) {
  client.errorMessages.generateErrorMessage(interaction, err);
 }
}
