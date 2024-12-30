import { GuildLogType } from "@majoexe/database/types";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Sticker, EmbedBuilder, inlineCode } from "discord.js";
import type { Majobot } from "@/index";

export async function stickerUpdate(client: Majobot, oldSticker: Sticker, newSticker: Sticker) {
 try {
  if (!newSticker.guild) return;
  const settings = await getGuildLogSettings(newSticker.guild.id, GuildLogType.GuildStickerUpdate);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = newSticker.guild;
  const logChannel = await discordGuild.channels.fetch(settings.channelId);
  if (!logChannel || !logChannel.isTextBased()) return;

  const fields = [
   {
    name: "Sticker",
    value: `${newSticker.toString()} (${inlineCode(newSticker.name)})`,
   },
   {
    name: "ID",
    value: inlineCode(newSticker.id),
   },
   {
    name: "Updated At",
    value: new Date().toISOString(),
   },
  ];

  if (oldSticker.name !== newSticker.name) {
   fields.push({
    name: "Old Name",
    value: inlineCode(oldSticker.name),
   });
   fields.push({
    name: "New Name",
    value: inlineCode(newSticker.name),
   });
  }

  if (oldSticker.format !== newSticker.format) {
   fields.push({
    name: "Old Format",
    value: inlineCode(oldSticker.format.toString() || "PNG"),
   });
   fields.push({
    name: "New Format",
    value: inlineCode(newSticker.format.toString() || "PNG"),
   });
  }

  const embed = new EmbedBuilder()
   .setTitle("📢 Sticker Updated")
   .setFields(fields)
   .setColor("#F59E0B")
   .setTimestamp()
   .setFooter({
    text: "Sticker updated",
    iconURL: discordGuild.iconURL({ size: 256 }) || undefined,
   });

  logChannel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
