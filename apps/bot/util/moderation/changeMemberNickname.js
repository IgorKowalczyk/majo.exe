import { EmbedBuilder, PermissionsBitField } from "discord.js";

export async function changememberNickname(client, interaction, color, type) {
 try {
  if (type === "set") {
   const user = interaction.options.getMember("user");
   const nickname = interaction.options.getString("nickname");

   if (!user) {
    return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to kick");
   }

   if (!nickname || nickname.length > 32) {
    return client.errorMessages.createSlashError(interaction, "❌ You need to provide a nickname to set");
   }

   if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
    return client.errorMessages.createSlashError(interaction, "❌ You need `MANAGE_NICKNAMES` permission to set nicknames");
   }

   if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
    return client.errorMessages.createSlashError(interaction, "❌ I need `MANAGE_NICKNAMES` permission to set nicknames");
   }

   if (user.roles.highest.comparePositionTo(interaction.member.roles.highest) >= 0) {
    return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than you");
   }

   if (user.roles.highest.comparePositionTo(interaction.guild.members.me.roles.highest) >= 0) {
    return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than me");
   }

   await interaction.guild.members.cache.get(user.id).edit({ nick: nickname });

   const embed = new EmbedBuilder()
    .setColor(color)
    .setTimestamp()
    .setTitle("🏷️ Nickname set")
    .setDescription(`> **${user}** nickname has been set to **${nickname}**`)
    .setFooter({
     text: `Changed by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    });

   interaction.followUp({ embeds: [embed] });
  } else if (type === "remove") {
   const user = interaction.options.getMember("user");

   if (!user) {
    return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to kick");
   }

   if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
    return client.errorMessages.createSlashError(interaction, "❌ You need `MANAGE_NICKNAMES` permission to set nicknames");
   }

   if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
    return client.errorMessages.createSlashError(interaction, "❌ I need `MANAGE_NICKNAMES` permission to set nicknames");
   }

   if (user.roles.highest.comparePositionTo(interaction.member.roles.highest) >= 0) {
    return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than you");
   }

   if (user.roles.highest.comparePositionTo(interaction.guild.members.me.roles.highest) >= 0) {
    return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than me");
   }

   await interaction.guild.members.cache.get(user.id).edit({ nick: null });

   const embed = new EmbedBuilder()
    .setColor(color)
    .setTimestamp()
    .setTitle("🏷️ Nickname removed")
    .setDescription(`> **${user}** nickname has been removed`)
    .setFooter({
     text: `Changed by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    });

   interaction.followUp({ embeds: [embed] });
  }
 } catch (err) {
  client.errorMessages.internalError(interaction, err);
 }
}
