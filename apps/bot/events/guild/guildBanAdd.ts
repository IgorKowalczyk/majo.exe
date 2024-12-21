import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { GuildBan, EmbedBuilder } from "discord.js";
import type { Majobot } from "@/index";

export async function guildBanAdd(client: Majobot, ban: GuildBan) {
 try {
  if (!ban.guild) return;
  const settings = await getGuildLogSettings(ban.guild.id, GuildLogType.GuildBanAdd);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = ban.guild;
  const channel = await discordGuild.channels.fetch(settings.channelId);
  if (!channel || !channel.isTextBased()) return;

  const fields = [
   {
    name: "User",
    value: `${ban.user.globalName || ban.user.username || "Unknown"} (${ban.user.id})`,
   },
   {
    name: "Reason",
    value: ban.reason || "No reason provided",
   },
  ];

  const embed = new EmbedBuilder()
   .setTitle("🔨 User Banned")
   .setFields(fields)
   .setColor("#EF4444")
   .setTimestamp()
   .setFooter({
    text: `Banned by ${ban.user.globalName || ban.user.username || "Unknown"}`,
    iconURL: ban.user.displayAvatarURL({ size: 256 }) || undefined,
   });

  channel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
