import { EmbedBuilder, PermissionsBitField } from "discord.js";

export async function unBanMember(client, interaction, color) {
 try {
  const user = interaction.options.getString("user_id");
  const reason = interaction.options.getString("reason") || "No reason provided";

  if (!user) {
   return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to unban");
  }

  if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
   return client.errorMessages.createSlashError(interaction, "❌ You need `BAN_MEMBERS` permission to unban members");
  }

  if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
   return client.errorMessages.createSlashError(interaction, "❌ I need `BAN_MEMBERS` permission to unban members");
  }

  await interaction.guild.members.unban(user, { reason: reason });

  const embed = new EmbedBuilder()
   .setColor(color)
   .setTimestamp()
   .setTitle("🔨 Member unbanned")
   .setDescription(`> **${user}** has been unbanned from the server\n> **Reason:** ${reason}`)
   .setFooter({
    text: `Unbanned by ${interaction.member?.user?.username}`,
    iconURL: interaction.member?.user?.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   });

  interaction.followUp({ embeds: [embed] });
 } catch (err) {
  console.log(err);
  client.errorMessages.internalError(interaction, err);
 }
}
