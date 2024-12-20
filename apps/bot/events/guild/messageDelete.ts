import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Message, Guild, EmbedBuilder, time, escapeCodeBlock } from "discord.js";
import type { Majobot } from "@/index";

export async function messageDelete(client: Majobot, message: Message): Promise<void> {
 try {
  if (!message.guild) return;
  const settings = await getGuildLogSettings(message.guild.id, GuildLogType.MessageDelete);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = message.guild as Guild;
  const channel = await discordGuild.channels.fetch(settings.channelId);
  if (!channel || !channel.isTextBased()) return;

  const fields = [
   {
    name: "Channel",
    value: message.channel.toString(),
   },
   {
    name: "Author",
    value: message.author.toString(),
   },
   {
    name: "Date deleted",
    value: time(new Date()),
   },
   {
    name: "Content",
    value: escapeCodeBlock(message.content) || "No content",
   },
  ];

  const embed = new EmbedBuilder()
   .setTitle("🗑️ Message Deleted")
   .setFields(fields)
   .setColor("#EF4444")
   .setTimestamp()
   .setFooter({
    text: `Deleted by ${message.author?.globalName || message.author?.username || "Unknown"}`,
    iconURL: message.author?.displayAvatarURL({ size: 256 }) || undefined,
   });

  channel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
