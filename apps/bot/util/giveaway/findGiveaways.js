import prismaClient from "@majoexe/database";
import { EmbedBuilder } from "discord.js";

/**
 * Find giveaways in a guild.
 *
 * @param {object} client - Discord Client
 * @param {object} interaction - Discord Interaction
 * @param {string} color - Embed color
 * @returns {Promise<void>} Promise that resolves when the giveaways are found
 * @throws {Error} Error that is thrown if the giveaways could not be found
 * */
export async function FindGiveaways(client, interaction, color, type) {
 try {
  await interaction.deferReply({ ephemeral: true });
  const giveaways = await prismaClient.giveaways.findMany({
   where: {
    guildId: interaction.guild.id,
   },
  });

  let list = giveaways.filter((giveaway) => {
   if (!giveaway.data) return false;
   if (type === "ended") {
    return giveaway.data.ended;
   } else if (type === "running") {
    return !giveaway.data.ended;
   }
   return true;
  });

  if (!giveaways) {
   return client.errorMessages.createSlashError(interaction, "❌ No giveaways found!");
  }

  const embed = new EmbedBuilder()
   .setColor(color)
   .setTimestamp()
   .setTitle(`🎉 Giveaways (${list.length})`)
   .setDescription(
    `>>> ${
     list.length > 0 // prettier
      ? list.map((g) => `**${g.data.prize ? g.data.prize.replace(`${client.config.emojis.giveaway} Giveaway: `, "").replace(`${client.config.emojis.giveaway} Drop: `, "") : "No prize"}**: Winners: \`${g.data.winnerCount || 1}\`${g.data.ended ? "" : `, Ends <t:${Math.floor(g.data.endAt / 1000)}:R>` || "No end date"}, https://discord.com/channels/${g.guildId}/${g.data.channelId}/${g.messageId}`).join("\n")
      : "No giveaways found for this type!"
    }`
   )
   .setFooter({
    text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
    iconURL: interaction.member.user.displayAvatarURL({
     size: 256,
    }),
   });
  return interaction.followUp({ ephemeral: true, embeds: [embed] });
 } catch (err) {
  client.errorMessages.internalError(interaction, err);
 }
}
