import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Guild, EmbedBuilder, inlineCode, time } from "discord.js";
import type { Majobot } from "@/index";

export async function guildUpdate(client: Majobot, oldGuild: Guild, newGuild: Guild) {
 try {
  const settings = await getGuildLogSettings(newGuild.id, GuildLogType.GuildUpdate);
  if (!settings?.enabled || !settings.channelId) return;
  const logChannel = await newGuild.channels.fetch(settings.channelId);
  if (!logChannel || !logChannel.isTextBased()) return;

  const fields = [
   {
    name: "Guild",
    value: `${newGuild.name} (${inlineCode(newGuild.id)})`,
   },
   {
    name: "Updated At",
    value: time(Date.now()),
   },
  ];

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
