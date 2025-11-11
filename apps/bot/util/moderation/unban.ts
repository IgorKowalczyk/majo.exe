import { ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField, type ColorResolvable } from "discord.js";
import type { Majobot } from "@/index";

export async function unBanMember(client: Majobot, interaction: ChatInputCommandInteraction, color: ColorResolvable) {
  try {
    if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
    if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ I can't execute this command in this server.");
    if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ I can't find you in this server.");
    const user = interaction.options.getString("user_id");
    const reason = interaction.options.getString("reason") || "No reason provided";

    if (!user) {
      return client.errorMessages.createSlashError(interaction, "❌ You need to provide a user to unban");
    }

    const memberPermissions = interaction.memberPermissions || new PermissionsBitField();

    if (!memberPermissions.has(PermissionsBitField.Flags.BanMembers)) {
      return client.errorMessages.createSlashError(interaction, "❌ You need `BAN_MEMBERS` permission to unban members");
    }

    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return client.errorMessages.createSlashError(interaction, "❌ I need `BAN_MEMBERS` permission to unban members");
    }

    await interaction.guild.members.unban(user, reason);

    const embed = new EmbedBuilder()
      .setColor(color)
      .setTimestamp()
      .setTitle("🔨 Member unbanned")
      .setDescription(`> **${user}** has been unbanned from the server\n> **Reason:** ${reason}`)
      .setFooter({
        text: `Unbanned by ${interaction.user.globalName || interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL({
          size: 256,
        }),
      });

    return interaction.followUp({ embeds: [embed] });
  } catch (err) {
    console.log(err);
    client.errorMessages.internalError(interaction, err);
  }
}
