import { resetXP, fetchXPSettings } from "@nyxia/util/database";
import { ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } from "discord.js";

export default {
 name: "reset-xp",
 description: "📈 Reset a user's XP",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: false,
 usage: "/reset <user>",
 default_member_permissions: [PermissionFlagsBits.Administrator],
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
   const xpSettings = await fetchXPSettings(interaction.guild.id);
   if (!xpSettings || !xpSettings.enableXP) {
    return client.errorMessages.createSlashError(interaction, "❌ XP is disabled in this server.");
   }
   const user = interaction.options.getUser("user");
   if (user.bot) {
    return client.errorMessages.createSlashError(interaction, "❌ You can't reset the XP of a bot.\nNote: Bots don't gain XP.");
   }

   await resetXP(user.id, interaction.guild.id);
   const embed = new EmbedBuilder()
    .setColor(guildSettings.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("✅ Success")
    .setDescription(`> Successfully reset the XP of ${user}`)
    .setThumbnail(user.displayAvatarURL({ size: 256 }))
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
 },
};
