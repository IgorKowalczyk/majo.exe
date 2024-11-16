import { resetXP, fetchXPSettings } from "@majoexe/util/database";
import { ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "reset-xp",
 description: "📈 Reset a user's XP",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 usage: "/reset <user>",
 contexts: [InteractionContextType.Guild],
 integrationTypes: [ApplicationIntegrationType.GuildInstall],
 defaultMemberPermissions: [PermissionFlagsBits.Administrator],
 options: [
  {
   name: "user",
   description: "The user you want to reset the XP of",
   type: ApplicationCommandOptionType.User,
   required: true,
  },
 ],
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

   const user = interaction.options.getUser("user");

   if (!user) return client.errorMessages.createSlashError(interaction, "❌ Please provide a valid user.");
   if (user.bot) return client.errorMessages.createSlashError(interaction, "❌ You can't reset the XP of a bot.\nNote: Bots don't gain XP.");

   await resetXP(user.id, interaction.guild.id);
   const embed = new EmbedBuilder()
    .setColor(guildSettings.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("✅ Success")
    .setDescription(`> Successfully reset the XP of ${user}`)
    .setThumbnail(user.displayAvatarURL({ size: 256 }))
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });
   return interaction.followUp({ ephemeral: true, embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
