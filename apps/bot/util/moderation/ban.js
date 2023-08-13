import { EmbedBuilder, PermissionsBitField } from "discord.js";

export async function banMember(client, interaction, color) {
 try {
  const user = interaction.options.getMember("user");
  const reason = interaction.options.getString("reason") || "No reason provided";

  if (!user) {
   return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to ban");
  }

  if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
   return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to ban members");
  }

  if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
   return client.errorMessages.createSlashError(interaction, "❌ I need `BAN_MEMBERS` permission to ban members");
  }

  if (user.id === interaction.user.id) {
   return client.errorMessages.createSlashError(interaction, "❌ You can't ban yourself, try banning someone else");
  }

  if (user.id === client.user.id) {
   return client.errorMessages.createSlashError(interaction, "❌ You can't ban me, try banning someone else");
  }

  if (user.roles.highest.comparePositionTo(interaction.member.roles.highest) >= 0) {
   return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than you, try banning someone else");
  }

  if (user.roles.highest.comparePositionTo(interaction.guild.members.me.roles.highest) >= 0) {
   return client.errorMessages.createSlashError(interaction, "❌ This user has higher or equal roles than me, try banning someone else");
  }

  await interaction.guild.members.ban(user, { reason: reason });

  const embed = new EmbedBuilder()
   .setColor(color)
   .setTimestamp()
   .setTitle("🔨 Member banned")
   .setDescription(`> **${user}** has been banned from the server\n> **Reason:** ${reason}`)
   .setFooter({
    text: `Banned by ${interaction.member?.user?.username}`,
    iconURL: interaction.member?.user?.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   });

  interaction.followUp({ embeds: [embed] });
 } catch (err) {
  client.errorMessages.internalError(interaction, err);
 }
}
