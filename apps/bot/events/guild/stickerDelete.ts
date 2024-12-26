import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Sticker, EmbedBuilder, inlineCode } from "discord.js";
import type { Majobot } from "@/index";

export async function stickerDelete(client: Majobot, sticker: Sticker) {
 try {
  if (!sticker.guild) return;
  const settings = await getGuildLogSettings(sticker.guild.id, GuildLogType.GuildStickerDelete);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = sticker.guild;
  const logChannel = await discordGuild.channels.fetch(settings.channelId);
  if (!logChannel || !logChannel.isTextBased()) return;

  const fields = [
   {
    name: "Sticker",
    value: `${sticker.name}`,
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
    name: "Deleted At",
    value: new Date().toISOString(),
   },
  ];

  const embed = new EmbedBuilder()
   .setTitle("📢 Sticker Deleted")
   .setFields(fields)
   .setColor("#EF4444")
   .setTimestamp()
   .setFooter({
    text: "Sticker deleted",
    iconURL: discordGuild.iconURL({ size: 256 }) || undefined,
   });

  logChannel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
