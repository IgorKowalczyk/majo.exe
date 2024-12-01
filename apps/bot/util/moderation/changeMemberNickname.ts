import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, GuildMemberRoleManager, PermissionsBitField, type ColorResolvable } from "discord.js";
import type { Majobot } from "@/index";

export async function changememberNickname(client: Majobot, interaction: ChatInputCommandInteraction, color: ColorResolvable, type: "set" | "remove" = "set") {
 try {
  if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
  if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ I can't execute this command in this server.");
  if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ I can't find you in this server.");

  if (type === "set") {
   const user = interaction.options.getMember("user") as GuildMember;
   const nickname = interaction.options.getString("nickname");

   if (!user) {
    return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to kick");
   }

   if (!nickname || nickname.length > 32) {
    return client.errorMessages.createSlashError(interaction, "❌ You need to provide a nickname to set");
   }

   const memberPermissions = interaction.memberPermissions || new PermissionsBitField();
   const memberRoles = interaction.member.roles as GuildMemberRoleManager;

   if (!memberPermissions.has(PermissionsBitField.Flags.ManageNicknames)) {
    return client.errorMessages.createSlashError(interaction, "❌ You need `MANAGE_NICKNAMES` permission to set nicknames");
   }

   if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
    return client.errorMessages.createSlashError(interaction, "❌ I need `MANAGE_NICKNAMES` permission to set nicknames");
   }

   if (user.roles.highest.comparePositionTo(memberRoles.highest) >= 0) {
    return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than you");
   }

   if (user.roles.highest.comparePositionTo(interaction.guild.members.me.roles.highest) >= 0) {
    return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than me");
   }

   const memberToEdit = interaction.guild.members.cache.get(user.id);

   if (!memberToEdit) {
    return client.errorMessages.createSlashError(interaction, "❌ I can't find this user in the server");
   }

   await memberToEdit.edit({ nick: nickname });

   const embed = new EmbedBuilder()
    .setColor(color)
    .setTimestamp()
    .setTitle("🏷️ Nickname set")
    .setDescription(`> **${user}** nickname has been set to **${nickname}**`)
    .setFooter({
     text: `Changed by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });

   interaction.followUp({ embeds: [embed] });
  } else if (type === "remove") {
   const user = interaction.options.getMember("user") as GuildMember;

   if (!user || !user.id) {
    return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to kick");
   }

   const memberPermissions = interaction.memberPermissions || new PermissionsBitField();
   const memberRoles = interaction.member.roles as GuildMemberRoleManager;

   if (!memberPermissions.has(PermissionsBitField.Flags.ManageNicknames)) {
    return client.errorMessages.createSlashError(interaction, "❌ You need `MANAGE_NICKNAMES` permission to set nicknames");
   }

   if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
    return client.errorMessages.createSlashError(interaction, "❌ I need `MANAGE_NICKNAMES` permission to set nicknames");
   }

   if (user.roles.highest.comparePositionTo(memberRoles.highest) >= 0) {
    return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than you");
   }

   if (user.roles.highest.comparePositionTo(interaction.guild.members.me.roles.highest) >= 0) {
    return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than me");
   }

   const memberToEdit = interaction.guild.members.cache.get(user.id);

   if (!memberToEdit) {
    return client.errorMessages.createSlashError(interaction, "❌ I can't find this user in the server");
   }

   await memberToEdit.edit({ nick: null });

   const embed = new EmbedBuilder()
    .setColor(color)
    .setTimestamp()
    .setTitle("🏷️ Nickname removed")
    .setDescription(`> **${user}** nickname has been removed`)
    .setFooter({
     text: `Changed by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });

   interaction.followUp({ embeds: [embed] });
  }
 } catch (err) {
  client.errorMessages.internalError(interaction, err);
 }
}
