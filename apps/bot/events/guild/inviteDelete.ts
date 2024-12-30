import { GuildLogType } from "@majoexe/database/types";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Invite, Guild, EmbedBuilder, time } from "discord.js";
import type { Majobot } from "@/index";

export async function inviteDelete(client: Majobot, invite: Invite) {
 try {
  if (!invite.guild) return;
  const settings = await getGuildLogSettings(invite.guild.id, GuildLogType.InviteDelete);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = invite.guild as Guild;
  const channel = await discordGuild.channels.fetch(settings.channelId);
  if (!channel || !channel.isTextBased()) return;

  const fields = [
   {
    name: "Invite",
    value: `[${invite.code}](${invite.url})`,
   },
   {
    name: "Uses",
    value: invite.uses?.toString() || "Unlimited",
   },
   {
    name: "Expires",
    value: invite.expiresAt ? time(invite.expiresAt) : "Never",
   },
  ];

  if (invite.channel) {
   fields.push({
    name: "Channel",
    value: invite.channel.toString(),
   });
  }

  const embed = new EmbedBuilder()
   .setTitle("📨 Invite Deleted")
   .setFields(fields)
   .setColor("#EF4444")
   .setTimestamp()
   .setFooter({
    text: `Deleted by ${invite.inviter?.globalName || invite.inviter?.username || "Unknown"}`,
    iconURL: invite.inviter?.displayAvatarURL({ size: 256 }) || undefined,
   });

  channel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
