import { GuildLogType } from "@majoexe/database/types";
import { getGuildLogSettings } from "@majoexe/util/database";
import { NonThreadGuildBasedChannel, DMChannel, EmbedBuilder, time, ChannelType, inlineCode } from "discord.js";
import type { Majobot } from "@/index";

export async function channelUpdate(client: Majobot, oldChannel: DMChannel | NonThreadGuildBasedChannel, newChannel: DMChannel | NonThreadGuildBasedChannel) {
 try {
  if (newChannel.type === ChannelType.DM) return;
  if (oldChannel.type === ChannelType.DM) return;

  if (!oldChannel.guild || !newChannel.guild) return;
  const settings = await getGuildLogSettings(newChannel.guild.id, GuildLogType.ChannelUpdate);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = newChannel.guild;
  const logChannel = await discordGuild.channels.fetch(settings.channelId);
  if (!logChannel || !logChannel.isTextBased()) return;

  const fields = [
   {
    name: "Channel",
    value: `${newChannel.toString()} (${inlineCode(newChannel.name)})`,
   },
   {
    name: "ID",
    value: inlineCode(newChannel.id),
   },
   {
    name: "Type",
    value: inlineCode(ChannelType[newChannel.type]),
   },
   {
    name: "Updated At",
    value: time(Date.now()),
   },
  ];

  if (oldChannel.name !== newChannel.name) {
   fields.push({
    name: "Old Name",
    value: inlineCode(oldChannel.name),
   });
   fields.push({
    name: "New Name",
    value: inlineCode(newChannel.name),
   });
  }

  const embed = new EmbedBuilder()
   .setTitle("✏️ Channel Updated")
   .setFields(fields)
   .setColor("#F59E0B")
   .setTimestamp()
   .setFooter({
    text: "Channel updated",
    iconURL: discordGuild.iconURL({ size: 256 }) || undefined,
   });

  logChannel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
