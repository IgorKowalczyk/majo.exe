import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, GuildMemberRoleManager, PermissionsBitField, type ColorResolvable } from "discord.js";
import type { Majobot } from "@/index";

export async function kickMember(client: Majobot, interaction: ChatInputCommandInteraction, color: ColorResolvable) {
 try {
  if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
  if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ I can't execute this command in this server.");
  if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ I can't find you in this server.");

  const user = interaction.options.getMember("user") as GuildMember;
  const reason = interaction.options.getString("reason") || "No reason provided";

  if (!user) {
   return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to kick");
  }

  const memberPermissions = interaction.member.permissions as PermissionsBitField;

  if (!memberPermissions.has(PermissionsBitField.Flags.KickMembers)) {
   return client.errorMessages.createSlashError(interaction, "❌ You need `KICK_MEMBERS` permission to kick members");
  }

  if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
   return client.errorMessages.createSlashError(interaction, "❌ I need `KICK_MEMBERS` permission to kick members");
  }

  if (user.id === interaction.member.user.id) {
   return client.errorMessages.createSlashError(interaction, "❌ You can't kick yourself");
  }

  if (user.id === client.user?.id) {
   return client.errorMessages.createSlashError(interaction, "❌ You can't kick me");
  }

  const userRoles = interaction.member.roles as GuildMemberRoleManager;

  if (user.roles.highest.comparePositionTo(userRoles.highest) >= 0) {
   return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than you");
  }

  if (user.roles.highest.comparePositionTo(interaction.guild.members.me.roles.highest) >= 0) {
   return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than me");
  }

  await interaction.guild.members.kick(user, reason);

  const embed = new EmbedBuilder()
   .setColor(color)
   .setTimestamp()
   .setTitle("🔨 Member kicked")
   .setDescription(`> **${user}** has been kicked from the server\n> **Reason:** ${reason}`)
   .setFooter({
    text: `Kicked by ${interaction.user.globalName || interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     size: 256,
    }),
   });

  interaction.followUp({ embeds: [embed] });
 } catch (err) {
  client.errorMessages.internalError(interaction, err);
 }
}
