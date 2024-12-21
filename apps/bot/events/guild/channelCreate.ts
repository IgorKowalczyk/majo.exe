import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { NonThreadGuildBasedChannel, Guild, EmbedBuilder, time } from "discord.js";
import type { Majobot } from "@/index";

export async function channelCreate(client: Majobot, channel: NonThreadGuildBasedChannel) {
 try {
  if (!channel.guild) return;
  const settings = await getGuildLogSettings(channel.guild.id, GuildLogType.ChannelCreate);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = channel.guild as Guild;
  const logChannel = await discordGuild.channels.fetch(settings.channelId);
  if (!logChannel || !logChannel.isTextBased()) return;

  const fields = [
   {
    name: "Channel",
    value: channel.toString(),
   },
   {
    name: "ID",
    value: channel.id,
   }
   {
    name: "Type",
    value: channel.type,
   },
   {
    name: "Created At",
    value: time(channel.createdAt),
   },
  ];

  const embed = new EmbedBuilder()
   .setTitle("📢 Channel Created")
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
