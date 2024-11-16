import { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder, PermissionFlagsBits, ChannelType, GuildMember, InteractionContextType, ApplicationIntegrationType } from "discord.js";
import ms from "ms";
import type { SlashCommand } from "@/util/types/Command";

export default {
 name: "slowmode",
 description: "🕐 Set the slowmode for a channel",
 type: ApplicationCommandType.ChatInput,
 cooldown: 2000,
 integrationTypes: [ApplicationIntegrationType.GuildInstall],
 contexts: [InteractionContextType.Guild],
 defaultMemberPermissions: [PermissionFlagsBits.ManageChannels],
 usage: "/slowmode <time>",
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
   if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
   if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ You must be in a server to use this command.");
   if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server data. Please try again.");
   if (!interaction.channel) return client.errorMessages.createSlashError(interaction, "❌ Unable to get channel data. Please try again.");
   if (interaction.channel.type !== ChannelType.GuildText) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a text channel");

   if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.ManageChannels)) return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to manage channels");
   if (!interaction.channel.permissionsFor(interaction.member as GuildMember).has(PermissionsBitField.Flags.ManageChannels)) return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to manage channels");

   const time = interaction.options.getString("time");
   if (!time) return client.errorMessages.createSlashError(interaction, "❌ Invalid time provided");

   const timeInMs = ms(time);

   if (!timeInMs) {
    return client.errorMessages.createSlashError(interaction, "❌ Invalid time provided");
   }

   if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.ManageChannels)) {
    return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to manage channels");
   }

   if (!interaction.channel.permissionsFor(interaction.member as GuildMember).has(PermissionsBitField.Flags.ManageChannels)) {
    return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to manage channels");
   }

   if (interaction.channel.rateLimitPerUser === timeInMs / 1000) {
    return client.errorMessages.createSlashError(interaction, "❌ Slowmode is already set to that time");
   }

   const before = interaction.channel.rateLimitPerUser;
   await interaction.channel.setRateLimitPerUser(timeInMs / 1000);

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle("🕐 Slowmode")
    .setDescription(`Slowmode has been changed from \`${ms(before * 1000)}\` to \`${time}\``)
    .setFooter({
     text: `Requested by ${interaction.user.globalName || interaction.user.username}`,
     iconURL: interaction.user.displayAvatarURL({
      size: 256,
     }),
    });

   return interaction.followUp({ ephemeral: false, embeds: [embed] });
  } catch (err) {
   client.errorMessages.internalError(interaction, err);
  }
 },
} satisfies SlashCommand;
