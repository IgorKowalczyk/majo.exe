import { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import ms from "ms";

export default {
 name: "slowmode",
 description: "🕐 Set the slowmode for a channel",
 type: ApplicationCommandType.ChatInput,
 cooldown: 2000,
 dm_permission: false,
 usage: "/slowmode <time>",
 default_member_permissions: [PermissionFlagsBits.ManageChannels],
 options: [
  {
   name: "time",
   description: "The time to set the slowmode to",
   type: ApplicationCommandOptionType.String,
   required: true,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  try {
   const time = interaction.options.getString("time");
   const channel = interaction.channel;
   const timeInMs = ms(time);

   if (!timeInMs) {
    return client.errorMessages.createSlashError(interaction, "❌ Invalid time provided");
   }

   if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.ManageChannels)) {
    return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to manage channels");
   }

   if (!channel.permissionsFor(interaction.member).has(PermissionsBitField.Flags.ManageChannels)) {
    return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to manage channels");
   }

   if (channel.rateLimitPerUser === timeInMs / 1000) {
    return client.errorMessages.createSlashError(interaction, "❌ Slowmode is already set to that time");
   }

   const before = channel.rateLimitPerUser;
   await channel.setRateLimitPerUser(timeInMs / 1000);

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("🕐 Slowmode")
    .setDescription(`Slowmode has been changed from \`${ms(before * 1000)}\` to \`${time}\``)
    .setFooter({
     text: `Requested by ${interaction.member.user.globalName || interaction.member.user.username}`,
     iconURL: interaction.member.user.displayAvatarURL({
      size: 256,
     }),
    });

   return interaction.followUp({ ephemeral: false, embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
};
