import { fetchLogs, countLogs } from "@majoexe/util/database";
import { ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";
import type { Majobot } from "../..";
import type { GuildSettings } from "../../util/types/Command";

export default {
 name: "logs",
 description: "📝 View the Majo.exe logs for this server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/logs [page]",
 defaultMemberPermissions: [PermissionFlagsBits.ManageGuild],
 options: [
  {
   name: "page",
   description: "The page number to view",
   type: ApplicationCommandOptionType.Integer,
   min_value: 1,
   max_value: 5000,
   required: false,
  },
 ],
 run: async (client: Majobot, interaction: ChatInputCommandInteraction, guildSettings: GuildSettings) => {
  try {
   if (!interaction.guild) return client.errorMessages.createSlashError(interaction, "❌ This command can only be used in a server.");
   if (!interaction.member) return client.errorMessages.createSlashError(interaction, "❌ You must be in a server to use this command.");
   if (!interaction.guildId) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server data. Please try again.");
   if (!interaction.guild.members.me) return client.errorMessages.createSlashError(interaction, "❌ Unable to get server data. Please try again.");

   const memberPermissions = interaction.member.permissions as PermissionsBitField;

   if (!memberPermissions.has(PermissionsBitField.Flags.ManageGuild)) return client.errorMessages.createSlashError(interaction, "❌ You don't have permission to use this command. You need `Manage Server` permission");
   if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageGuild)) return client.errorMessages.createSlashError(interaction, "❌ I don't have permission to change settings. Please give me `Manage Server` permission");

   const count = interaction.options.getInteger("page") || 1;
   const logs = await fetchLogs(interaction.guildId, count);

   if (!logs || logs.length < 1) {
    return client.errorMessages.createSlashError(interaction, "❌ There are no logs found for this query or server");
   }

   const logsArray = logs.slice(0, 20).map((log) => {
    const emoji = client.config.emojis.logs.find((l: { type: string; emoji: string }) => l.type === log.type)?.emoji || "❔";
    return `**${emoji} <@${log.authorId}>**: ${log.content}`;
   });

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle(`📝 Logs (${count}/${Math.ceil((await countLogs(interaction.guildId)) / 20)})`)
    .setDescription(logsArray.join("\n"))
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
};
