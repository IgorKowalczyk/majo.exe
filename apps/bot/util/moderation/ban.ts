import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, GuildMemberRoleManager, PermissionsBitField, type ColorResolvable } from "discord.js";
import type { Majobot } from "../..";

export async function banMember(client: Majobot, interaction: ChatInputCommandInteraction, color: ColorResolvable) {
 try {
  if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
  if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ I can't execute this command in this server.");
  if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ I can't find you in this server.");
  const user = interaction.options.getMember("user") as GuildMember;
  const reason = interaction.options.getString("reason") || "No reason provided";

  if (!user) {
   return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to ban");
  }

  const memberPermissions = interaction.member.permissions as PermissionsBitField;

  if (!memberPermissions.has(PermissionsBitField.Flags.BanMembers)) {
   return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to ban members");
  }

  if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
   return client.errorMessages.createSlashError(interaction, "❌ I need `BAN_MEMBERS` permission to ban members");
  }

  if (user.id === interaction.member.user.id) {
   return client.errorMessages.createSlashError(interaction, "❌ You can't ban yourself, try banning someone else");
  }

  if (user.id === client.user?.id) {
   return client.errorMessages.createSlashError(interaction, "❌ You can't ban me, try banning someone else");
  }

  const memberRoles = interaction.member.roles as GuildMemberRoleManager;

  if (user.roles.highest.comparePositionTo(memberRoles.highest) >= 0) {
   return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than you, try banning someone else");
  }

  if (user.roles.highest.comparePositionTo(interaction.guild.members.me.roles.highest) >= 0) {
   return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than me, try banning someone else");
  }

  await interaction.guild.members.ban(user, { reason });

  const embed = new EmbedBuilder()
   .setColor(color)
   .setTimestamp()
   .setTitle("🔨 Member banned")
   .setDescription(`> **${user}** has been banned from the server\n> **Reason:** ${reason}`)
   .setFooter({
    text: `Banned by ${interaction.user.globalName || interaction.user.username}`,
    iconURL: interaction.user.displayAvatarURL({
     size: 256,
    }),
   });

  interaction.followUp({ embeds: [embed] });
 } catch (err) {
  client.errorMessages.internalError(interaction, err);
 }
}
