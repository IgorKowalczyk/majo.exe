import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Message, Guild, EmbedBuilder, escapeCodeBlock, time } from "discord.js";
import type { Majobot } from "@/index";

export async function messageUpdate(client: Majobot, oldMessage: Message, newMessage: Message) {
 try {
  console.log(oldMessage, newMessage);
  if (!oldMessage.guild || !newMessage.guild) return;
  const settings = await getGuildLogSettings(newMessage.guild.id, GuildLogType.MessageUpdate);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = newMessage.guild as Guild;
  const channel = await discordGuild.channels.fetch(settings.channelId);
  if (!channel || !channel.isTextBased()) return;

  const fields = [
   {
    name: "Channel",
    value: oldMessage.channel.toString(),
   },
   {
    name: "Author",
    value: oldMessage.author.toString(),
   },
   {
    name: "Date edited",
    value: time(newMessage.editedAt || new Date()),
   },
   {
    name: "Old content",
    value: escapeCodeBlock(oldMessage.content) || "No content",
   },
   {
    name: "New content",
    value: escapeCodeBlock(newMessage.content) || "No content",
   },
  ];

  const embed = new EmbedBuilder()
   .setTitle("✏️ Message Updated")
   .setFields(fields)
   .setColor("#F59E0B")
   .setTimestamp()
   .setFooter({
    text: `Updated by ${oldMessage.author.globalName || oldMessage.author.username || "Unknown"}`,
    iconURL: oldMessage.author.displayAvatarURL({ size: 256 }) || undefined,
   });

  channel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
