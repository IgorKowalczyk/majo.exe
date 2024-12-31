import { GuildLogType } from "@majoexe/database/types";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Guild, EmbedBuilder, inlineCode, time, codeBlock } from "discord.js";
import type { Majobot } from "@/index";

export async function guildUpdate(client: Majobot, oldGuild: Guild, newGuild: Guild) {
 try {
  const settings = await getGuildLogSettings(newGuild.id, GuildLogType.GuildUpdate);
  if (!settings?.enabled || !settings.channelId) return;
  const logChannel = await newGuild.channels.fetch(settings.channelId);
  if (!logChannel || !logChannel.isTextBased()) return;

  console.log(oldGuild, newGuild);

  const fields = [
   {
    name: "Guild",
    value: `${newGuild.name} (${inlineCode(newGuild.id)})`,
   },
   {
    name: "Updated At",
    value: time(Math.round(Date.now() / 1000)),
   },
  ];

  if (oldGuild.nsfwLevel !== newGuild.nsfwLevel) {
   fields.push({
    name: "Old NSFW Level",
    value: inlineCode(oldGuild.nsfwLevel.toString() || "None"),
   });
   fields.push({
    name: "New NSFW Level",
    value: inlineCode(newGuild.nsfwLevel.toString() || "None"),
   });
  }

  if (oldGuild.splashURL() !== newGuild.splashURL()) {
   fields.push({
    name: "Old Splash",
    value: oldGuild.splashURL() ? `[Link](${oldGuild.splashURL()})` : "None",
   });
   fields.push({
    name: "New Splash",
    value: newGuild.splashURL() ? `[Link](${newGuild.splashURL()})` : "None",
   });
  }

  if (oldGuild.bannerURL() !== newGuild.bannerURL()) {
   fields.push({
    name: "Old Banner",
    value: oldGuild.bannerURL() ? `[Link](${oldGuild.bannerURL()})` : "None",
   });
   fields.push({
    name: "New Banner",
    value: newGuild.bannerURL() ? `[Link](${newGuild.bannerURL()})` : "None",
   });
  }

  if (oldGuild.description !== newGuild.description) {
   fields.push({
    name: "Old Description",
    value: codeBlock(oldGuild.description || "None"),
   });
   fields.push({
    name: "New Description",
    value: codeBlock(newGuild.description || "None"),
   });
  }

  if (oldGuild.rulesChannelId !== newGuild.rulesChannelId) {
   fields.push({
    name: "Old Rules Channel",
    value: inlineCode(oldGuild.rulesChannelId || "None"),
   });
   fields.push({
    name: "New Rules Channel",
    value: inlineCode(newGuild.rulesChannelId || "None"),
   });
  }

  if (oldGuild.publicUpdatesChannelId !== newGuild.publicUpdatesChannelId) {
   fields.push({
    name: "Old Public Updates Channel",
    value: inlineCode(oldGuild.publicUpdatesChannelId || "None"),
   });
   fields.push({
    name: "New Public Updates Channel",
    value: inlineCode(newGuild.publicUpdatesChannelId || "None"),
   });
  }

  if (oldGuild.safetyAlertsChannelId !== newGuild.safetyAlertsChannelId) {
   fields.push({
    name: "Old Safety Alerts Channel",
    value: inlineCode(oldGuild.safetyAlertsChannelId || "None"),
   });
   fields.push({
    name: "New Safety Alerts Channel",
    value: inlineCode(newGuild.safetyAlertsChannelId || "None"),
   });
  }

  if (oldGuild.name !== newGuild.name) {
   fields.push({
    name: "Old Name",
    value: inlineCode(oldGuild.name),
   });
   fields.push({
    name: "New Name",
    value: inlineCode(newGuild.name),
   });
  }

  if (oldGuild.icon !== newGuild.icon) {
   fields.push({
    name: "Old Icon",
    value: oldGuild.iconURL() ? `[Link](${oldGuild.iconURL()})` : "None",
   });
   fields.push({
    name: "New Icon",
    value: newGuild.iconURL() ? `[Link](${newGuild.iconURL()})` : "None",
   });
  }

  if (fields.length === 2) {
   fields.push({
    name: "We couldn't find any changes",
    value: "Due to the limitations of the Discord, we couldn't find any changes in the guild, check the audit logs for more information.",
   });
  }

  const embed = new EmbedBuilder()
   .setTitle("✏️ Guild Updated")
   .setFields(fields)
   .setColor("#F59E0B")
   .setTimestamp()
   .setFooter({
    text: "Guild updated",
    iconURL: newGuild.iconURL({ size: 256 }) || undefined,
   });

  logChannel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
