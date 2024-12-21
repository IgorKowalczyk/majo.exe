import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Collection, Message, EmbedBuilder, inlineCode } from "discord.js";
import type { Majobot } from "@/index";

export async function messageBulkDelete(client: Majobot, messages: Collection<string, Message>): Promise<void> {
 try {
  if (messages.size === 0) return;
  const firstMessage = messages.first();
  if (!firstMessage?.guild) return;
  const settings = await getGuildLogSettings(firstMessage.guild.id, GuildLogType.MessageBulkDelete);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = firstMessage.guild;
  const channel = await discordGuild.channels.fetch(settings.channelId);
  if (!channel || !channel.isTextBased()) return;

  const fields = [
   {
    name: "Channel",
    value: firstMessage.channel.toString(),
   },
   {
    name: "Messages Deleted",
    value: inlineCode(messages.size.toString()),
   },
  ];

  const embed = new EmbedBuilder()
   .setTitle("🗑️ Bulk Message Deleted")
   .setFields(fields)
   .setColor("#EF4444")
   .setTimestamp()
   .setFooter({
    text: `Bulk delete by ${firstMessage.author.globalName || firstMessage.author.username || "Unknown"}`,
    iconURL: firstMessage.guild.iconURL({ size: 256 }) || undefined,
   });

  channel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
