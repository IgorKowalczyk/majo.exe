import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { NonThreadGuildBasedChannel, EmbedBuilder, time, DMChannel, ChannelType, inlineCode } from "discord.js";
import type { Majobot } from "@/index";

export async function channelDelete(client: Majobot, channel: DMChannel | NonThreadGuildBasedChannel) {
 try {
  if (channel.type === ChannelType.DM) return;
  if (!channel.guild) return;
  const settings = await getGuildLogSettings(channel.guild.id, GuildLogType.ChannelDelete);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = channel.guild;
  const logChannel = await discordGuild.channels.fetch(settings.channelId);
  if (!logChannel || !logChannel.isTextBased()) return;

  const fields = [
   {
    name: "Channel",
    value: `${channel.toString()} (${inlineCode(channel.name)})`,
   },
   {
    name: "ID",
    value: inlineCode(channel.id),
   },
   {
    name: "Type",
    value: inlineCode(ChannelType[channel.type]),
   },
   {
    name: "Created At",
    value: time(channel.createdAt),
   },
   {
    name: "Deleted at",
    value: time(Date.now()),
   },
  ];

  const embed = new EmbedBuilder()
   .setTitle("📢 Channel Deleted")
   .setFields(fields)
   .setColor("#3B82F6")
   .setTimestamp()
   .setFooter({
    text: `Channel created`,
    iconURL: discordGuild.iconURL({ size: 256 }) || undefined,
   });

  logChannel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
