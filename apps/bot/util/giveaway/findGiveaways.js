import prismaClient from "@majoexe/database";
import { EmbedBuilder } from "discord.js";

/**
 * @param client Discord Client
 * @param interaction Discord Interaction
 * @param color Embed color
 * @returns {Promise<void>}
 * */
export async function FindGiveaways(client, interaction, color, type) {
 try {
  await interaction.deferReply({ ephemeral: true });
  const giveaways = await prismaClient.giveaways.findMany({
   where: {
    guildId: interaction.guild.id,
   },
  });

  let list = [];

  giveaways.map((giveaway) => {
   if (type === "ended") {
    if (giveaway.data?.ended) {
     list.push(giveaway);
    }
   } else if (type === "running") {
    if (!giveaway.data?.ended) {
     list.push(giveaway);
    }
   } else {
    list.push(giveaway);
   }
  });

  if (!giveaways) {
   const embed = new EmbedBuilder()
    .setColor("#EF4444")
    .setTimestamp()
    .setTitle("❌ Error")
    .setDescription("> No giveaways found!")
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
   .setColor(color)
   .setTimestamp()
   .setTitle(`🎉 Giveaways (${list.length})`)
   .setDescription(
    `>>> ${
     list.length > 0 // prettier
      ? list.map((g) => `**${g.data?.prize ? g.data?.prize.replace(`${client.botEmojis.giveaway} Giveaway: `, "").replace(`${client.botEmojis.giveaway} Drop: `, "") : "No prize"}**: Winners: \`${g.data?.winnerCount || 1}\`${g.data?.ended ? "" : `, Ends <t:${Math.floor(g.data?.endAt / 1000)}:R>` || "No end date"}, https://discord.com/channels/${g.guildId}/${g.data?.channelId}/${g.messageId}`).join("\n")
      : "No giveaways found for this type!"
    }`
   )
   .setFooter({
    text: `Requested by ${interaction.member?.user?.username}`,
    iconURL: interaction.member?.user?.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   });
  return interaction.followUp({ ephemeral: true, embeds: [embed] });
 } catch (err) {
  return interaction.followUp({
   ephemeral: true,
   embeds: [
    new EmbedBuilder()
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
     }),
   ],
  });
 }
}