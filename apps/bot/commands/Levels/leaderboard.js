import prismaClient from "@majoexe/database";
import { fetchXPSettings } from "@majoexe/util/database";
import { ApplicationCommandType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";

export default {
 name: "leaderboard",
 description: "📈 Check 10 top users with most XP points",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: false,
 run: async (client, interaction, guildSettings) => {
  try {
   const xpSettings = await fetchXPSettings(interaction.guild.id);
   if (!xpSettings || !xpSettings.enableXP) {
    return client.errorMessages.createSlashError(interaction, "❌ XP is disabled in this server.");
   }

   const xp = await prismaClient.guildXp.findMany({
    where: {
     guildId: interaction.guild.id,
    },
    orderBy: {
     xp: "desc",
    },
    take: 10,
    include: {
     user: {
      select: {
       discordId: true,
      },
     },
    },
   });

   const embed = new EmbedBuilder()
    .setTitle(`📈 XP Leaderboard (${xp.length} users)`)
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({ size: 256 }),
    })
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setDescription(
     `${
      xp.length === 0 || !xp
       ? "❌ 0 users found"
       : xp
          .map((user, index) => {
           const place = index + 1;
           const emoji = place === 1 ? "🥇" : place === 2 ? "🥈" : place === 3 ? "🥉" : place;
           return `**[${emoji}]** <@${user.userId}> - \`${user.xp}xp\``;
          })
          .join("\n")
     }`
    );
   if (client.config.dashboard.enabled && client.config.dashboard.link) {
    const contactButton = new ButtonBuilder().setLabel("View Leaderboard").setStyle(ButtonStyle.Link).setURL(`${client.config.dashboard.link}/dashboard/${interaction.guild.id}/leaderboard`);
    const action = new ActionRowBuilder().addComponents(contactButton);
    return interaction.followUp({ ephemeral: false, embeds: [embed], components: [action] });
   } else {
    return interaction.followUp({ ephemeral: false, embeds: [embed] });
   }
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
};
