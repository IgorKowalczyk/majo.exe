import { GuildLogType } from "@majoexe/database/types";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Sticker, EmbedBuilder, time, inlineCode, codeBlock, StickerFormatType } from "discord.js";
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
        name: "Sticker Name",
        value: `${inlineCode(sticker.name)}`,
      },
      {
        name: "Description",
        value: codeBlock(sticker.description || "None"),
      },
      {
        name: "Emoji",
        value: sticker.tags?.toString() || "None",
      },
      {
        name: "ID",
        value: inlineCode(sticker.id),
      },
      {
        name: "Format",
        value: inlineCode(StickerFormatType[sticker.format] || "Unknown"),
      },
      {
        name: "Created At",
        value: time(sticker.createdAt),
      },
    ];

    if (sticker.user) {
      fields.push({
        name: "Creator",
        value: `${sticker.user.toString()} (${inlineCode(sticker.user.id)})`,
      });
    }

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
