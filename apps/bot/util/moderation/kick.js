import { EmbedBuilder, PermissionsBitField } from "discord.js";

export async function kickMember(client, interaction, color) {
 try {
  const user = interaction.options.getMember("user");
  const reason = interaction.options.getString("reason") || "No reason provided";

  if (!user) {
   return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to kick");
  }

  if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
   return client.errorMessages.createSlashError(interaction, "❌ You need `KICK_MEMBERS` permission to kick members");
  }

  if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
   return client.errorMessages.createSlashError(interaction, "❌ I need `KICK_MEMBERS` permission to kick members");
  }

  if (user.id === interaction.user.id) {
   return client.errorMessages.createSlashError(interaction, "❌ You can't kick yourself");
  }

  if (user.id === client.user.id) {
   return client.errorMessages.createSlashError(interaction, "❌ You can't kick me");
  }

  if (user.roles.highest.comparePositionTo(interaction.member.roles.highest) >= 0) {
   return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than you");
  }

  if (user.roles.highest.comparePositionTo(interaction.guild.members.me.roles.highest) >= 0) {
   return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than me");
  }

  await interaction.guild.members.kick(user, { reason: reason });

  const embed = new EmbedBuilder()
   .setColor(color)
   .setTimestamp()
   .setTitle("🔨 Member kicked")
   .setDescription(`> **${user}** has been kicked from the server\n> **Reason:** ${reason}`)
   .setFooter({
    text: `Kicked by ${interaction.member.user.username}`,
    iconURL: interaction.member.user.displayAvatarURL({
     size: 256,
    }),
   });

  interaction.followUp({ embeds: [embed] });
 } catch (err) {
  client.errorMessages.internalError(interaction, err);
 }
}
