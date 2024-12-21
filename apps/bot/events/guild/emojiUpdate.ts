import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { GuildEmoji, EmbedBuilder, inlineCode } from "discord.js";
import type { Majobot } from "@/index";

export async function emojiUpdate(client: Majobot, oldEmoji: GuildEmoji, newEmoji: GuildEmoji) {
 try {
  if (!newEmoji.guild) return;
  const settings = await getGuildLogSettings(newEmoji.guild.id, GuildLogType.GuildEmojiUpdate);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = newEmoji.guild;
  const logChannel = await discordGuild.channels.fetch(settings.channelId);
  if (!logChannel || !logChannel.isTextBased()) return;

  const fields = [
   {
    name: "Emoji",
    value: `${newEmoji.toString()} (${inlineCode(newEmoji.name)})`,
   },
   {
    name: "ID",
    value: inlineCode(newEmoji.id),
   },
   {
    name: "Updated At",
    value: time(Date.now()),
   },
  ];

  if (oldEmoji.name !== newEmoji.name) {
   fields.push({
    name: "Old Name",
    value: inlineCode(oldEmoji.name),
   });
   fields.push({
    name: "New Name",
    value: inlineCode(newEmoji.name),
   });
  }

  const embed = new EmbedBuilder()
   .setTitle("✏️ Emoji Updated")
   .setFields(fields)
   .setColor("#F59E0B")
   .setTimestamp()
   .setFooter({
    text: `Emoji updated`,
    iconURL: discordGuild.iconURL({ size: 256 }) || undefined,
   });

  logChannel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
