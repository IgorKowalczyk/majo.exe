import { fetchLogs, countLogs } from "@nyxia/util/database";
import { ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } from "discord.js";

export default {
 name: "logs",
 description: "📝 View the logs for this server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/logs [page]",
 default_member_permissions: [PermissionFlagsBits.ManageGuild],
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
 run: async (client, interaction, guildSettings) => {
  try {
   const count = interaction.options.getInteger("page") || 1;
   const logs = await fetchLogs(interaction.guildId, count);

   if (!logs || logs.length < 1) {
    return client.errorMessages.createSlashError(interaction, "❌ There are no logs found for this query or server");
   }

   const logsArray = logs.slice(0, 20).map((log) => {
    const emoji = client.config.emojis.logs.find((l) => l.type === log.type)?.emoji || "❔";
    return `**${emoji} <@${log.authorId}>**: ${log.content}`;
   });

   const embed = new EmbedBuilder()
    .setColor(guildSettings?.embedColor || client.config.defaultColor)
    .setTimestamp()
    .setTitle(`📝 Logs (${count}/${Math.ceil((await countLogs(interaction.guildId)) / 20)})`)
    .setDescription(logsArray.join("\n"))
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
