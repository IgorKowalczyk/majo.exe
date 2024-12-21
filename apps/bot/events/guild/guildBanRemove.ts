import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { GuildBan, EmbedBuilder } from "discord.js";
import type { Majobot } from "@/index";

export async function guildBanRemove(client: Majobot, ban: GuildBan) {
 try {
  if (!ban.guild) return;
  const settings = await getGuildLogSettings(ban.guild.id, GuildLogType.GuildBanRemove);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = ban.guild;
  const channel = await discordGuild.channels.fetch(settings.channelId);
  if (!channel || !channel.isTextBased()) return;

  const fields = [
   {
    name: "User",
    value: `${ban.user.globalName || ban.user.username || "Unknown"} (${ban.user.id})`,
   },
  ];

  const embed = new EmbedBuilder()
   .setTitle("🔓 User Unbanned")
   .setFields(fields)
   .setColor("#10B981")
   .setTimestamp()
   .setFooter({
    text: `Unbanned by ${ban.user.globalName || ban.user.username || "Unknown"}`,
    iconURL: ban.user.displayAvatarURL({ size: 256 }) || undefined,
   });

  channel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
