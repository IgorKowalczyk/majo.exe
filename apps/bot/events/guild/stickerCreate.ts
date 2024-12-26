import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Sticker, EmbedBuilder, time, inlineCode } from "discord.js";
import type { Majobot } from "@/index";

export async function stickerCreate(client: Majobot, sticker: Sticker) {
 try {
  if (!sticker.guild) return;
  const settings = await getGuildLogSettings(sticker.guild.id, GuildLogType.GuildStickerCreate);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = sticker.guild;
  const logChannel = await discordGuild.channels.fetch(settings.channelId);
  if (!logChannel || !logChannel.isTextBased()) return;

  const fields = [
   {
    name: "Sticker",
    value: `${sticker.toString()} (${inlineCode(sticker.name)})`,
   },
   {
    name: "ID",
    value: inlineCode(sticker.id),
   },
   {
    name: "Format",
    value: inlineCode(sticker.format.toString() || "PNG"),
   },
   {
    name: "Created At",
    value: time(sticker.createdAt),
   },
   {
    name: "Created By",
    value: `${sticker.user?.toString() || "Unknown"}`,
   },
  ];

  const embed = new EmbedBuilder()
   .setTitle("📢 Sticker Created")
   .setFields(fields)
   .setColor("#3B82F6")
   .setTimestamp()
   .setFooter({
    text: "Sticker created",
    iconURL: discordGuild.iconURL({ size: 256 }) || undefined,
   });

  logChannel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
