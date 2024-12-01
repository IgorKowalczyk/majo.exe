import prismaClient from "@majoexe/database";
import { fetchXPSettings } from "@majoexe/util/database";
import { ApplicationCommandType, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "leaderboard",
 description: "📈 Check 10 top users with most XP points",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 usage: "/leaderboard",
 contexts: [InteractionContextType.Guild],
 integrationTypes: [ApplicationIntegrationType.GuildInstall],
 run: async (client, interaction, guildSettings) => {
  try {
   if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
   if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ You must be in a server to use this command.");
   if (!interaction.guildId) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server data. Please try again.");
   if (!guildSettings) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server settings. Please try again.");

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
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({ size: 256 }),
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
           const emoji = place === 1 ? "🥇" : place === 2 ? "🥈" : place === 3 ? "🥉" : ` ${place} `;
           return `**[${emoji}]** <@${user.userId}> - \`${user.xp}xp\``;
          })
          .join("\n")
     }`
    );

   const components: ButtonBuilder[] = [];

   if (client.config.url) {
    const userPermissions = interaction.memberPermissions || new PermissionsBitField();

    if (userPermissions.has(PermissionsBitField.Flags.Administrator) || userPermissions.has(PermissionsBitField.Flags.ManageGuild)) {
     components.push(
      new ButtonBuilder() // Prettier
       .setLabel("View Leaderboard")
       .setStyle(ButtonStyle.Link)
       .setURL(`${client.config.url}/dashboard/${interaction.guild.id}/leaderboard`)
     );
    } else if (guildSettings.publicPage) {
     components.push(
      new ButtonBuilder() // Prettier
       .setLabel("View Leaderboard")
       .setStyle(ButtonStyle.Link)
       .setURL(`${client.config.url}/server/${guildSettings.vanity || interaction.guild.id}/`)
     );
    }
   }

   const row = new ActionRowBuilder<ButtonBuilder>() // prettier
    .addComponents(components);

   return interaction.followUp({ ephemeral: false, embeds: [embed], components: [row || null] });
  } catch (err) {
   console.log(err);
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
