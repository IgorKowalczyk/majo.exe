import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { GuildEmoji, EmbedBuilder, inlineCode, time } from "discord.js";
import type { Majobot } from "@/index";

export async function emojiCreate(client: Majobot, emoji: GuildEmoji) {
 try {
  if (!emoji.guild) return;
  const settings = await getGuildLogSettings(emoji.guild.id, GuildLogType.GuildEmojiCreate);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = emoji.guild;
  const logChannel = await discordGuild.channels.fetch(settings.channelId);
  if (!logChannel || !logChannel.isTextBased()) return;

  const fields = [
   {
    name: "Emoji",
    value: `${emoji.toString()} (${inlineCode(emoji.name || "N/A")})`,
   },
   {
    name: "ID",
    value: inlineCode(emoji.id),
   },
   {
    name: "Created At",
    value: time(emoji.createdAt),
   },
   {
    name: "Created By",
    value: `${emoji.author?.toString() || "N/A"} (${inlineCode(emoji.author?.id || "N/A")})`,
   },
  ];

  const embed = new EmbedBuilder()
   .setTitle("🆕 Emoji Created")
   .setFields(fields)
   .setColor("#3B82F6")
   .setTimestamp()
   .setFooter({
    text: `Emoji created`,
    iconURL: discordGuild.iconURL({ size: 256 }) || undefined,
   });

  logChannel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
