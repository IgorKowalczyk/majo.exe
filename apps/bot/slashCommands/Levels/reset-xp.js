import { resetXP } from "@majoexe/util/database";
import { ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } from "discord.js";

export default {
 name: "reset-xp",
 description: "📈 Reset a user's XP",
 type: ApplicationCommandType.ChatInput,
 cooldown: 3000,
 dm_permission: false,
 usage: "/reset <user>",
 options: [
  {
   name: "user",
   description: "The user you want to reset the XP of",
   type: ApplicationCommandOptionType.User,
   required: true,
  },
 ],
 default_member_permissions: [PermissionFlagsBits.Administrator],
 run: async (client, interaction, guildSettings) => {
  try {
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
    .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
    .setFooter({
     text: `Requested by ${interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   return interaction.followUp({ ephemeral: true, embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
