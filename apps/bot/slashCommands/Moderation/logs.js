import { fetchLogs, countLogs } from "@majoexe/util/database";
import { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from "discord.js";

export default {
 name: "logs",
 description: "📝 View the Majo.exe logs for this server",
 type: ApplicationCommandType.ChatInput,
 cooldown: 5000,
 dm_permission: false,
 usage: "/logs [page]",
 options: [
  {
   name: "page",
   description: "The page number to view",
   type: ApplicationCommandOptionType.Integer,
   required: false,
  },
 ],
 run: async (client, interaction, guildSettings) => {
  const count = interaction.options.getInteger("page") || 1;
  const logs = await fetchLogs(interaction.guildId, count);

  if (!logs || logs.length < 1) {
   const embed = new EmbedBuilder()
    .setColor("#EF4444")
    .setTimestamp()
    .setTitle("❌ No logs found")
    .setDescription("> There are no logs found for this query or server.")
    .setFooter({
     text: `Requested by ${interaction.member?.user?.username}`,
     iconURL: interaction.member?.user?.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    });
   return interaction.followUp({ ephemeral: true, embeds: [embed] });
  }

  const logsArray = logs.slice(0, 20).map((log) => {
   const emoji = client.botEmojis.logs.find((l) => l.type === log.type)?.emoji || "❔";
   return `**${emoji} <@${log.authorId}>**: ${log.content}`;
  });

  const embed = new EmbedBuilder()
   .setColor(guildSettings?.embedColor || client.config.global.defaultColor)
   .setTimestamp()
   .setTitle(`📝 Logs (${count}/${Math.ceil((await countLogs(interaction.guildId)) / 20)})`)
   .setDescription(logsArray.join("\n"))
   .setFooter({
    text: `Requested by ${interaction.member?.user?.username}`,
    iconURL: interaction.member?.user?.displayAvatarURL({
     dynamic: true,
     format: "png",
     size: 2048,
    }),
   });

  return interaction.followUp({ ephemeral: false, embeds: [embed] });
 },
};
