import { GuildLogType } from "@majoexe/database/types";
import { getGuildLogSettings } from "@majoexe/util/database";
import { GuildEmoji, EmbedBuilder, inlineCode, time } from "discord.js";
import type { Majobot } from "@/index";

export async function emojiDelete(client: Majobot, emoji: GuildEmoji) {
 try {
  if (!emoji.guild) return;
  const settings = await getGuildLogSettings(emoji.guild.id, GuildLogType.GuildEmojiDelete);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = emoji.guild;
  const logChannel = await discordGuild.channels.fetch(settings.channelId);
  if (!logChannel || !logChannel.isTextBased()) return;

  const fields = [
   {
    name: "Emoji",
    value: `${emoji.toString()} (${inlineCode(emoji.name || "None")})`,
   },
   {
    name: "ID",
    value: inlineCode(emoji.id),
   },
   {
    name: "Deleted At",
    value: time(Math.round(Date.now() / 1000)),
   },
  ];

  const embed = new EmbedBuilder()
   .setTitle("❌ Emoji Deleted")
   .setFields(fields)
   .setColor("#EF4444")
   .setTimestamp()
   .setFooter({
    text: "Emoji deleted",
    iconURL: discordGuild.iconURL({ size: 256 }) || undefined,
   });

  logChannel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
