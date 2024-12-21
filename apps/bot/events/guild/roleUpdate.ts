import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Role, EmbedBuilder, inlineCode, time } from "discord.js";
import type { Majobot } from "@/index";

export async function roleUpdate(client: Majobot, oldRole: Role, newRole: Role) {
 try {
  if (!newRole.guild) return;
  const settings = await getGuildLogSettings(newRole.guild.id, GuildLogType.GuildRoleUpdate);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = newRole.guild;
  const logChannel = await discordGuild.channels.fetch(settings.channelId);
  if (!logChannel || !logChannel.isTextBased()) return;

  const fields = [
   {
    name: "Role",
    value: `${newRole.toString()} (${inlineCode(newRole.name)})`,
   },
   {
    name: "ID",
    value: inlineCode(newRole.id),
   },
   {
    name: "Updated At",
    value: time(Date.now()),
   },
  ];

  if (oldRole.name !== newRole.name) {
   fields.push({
    name: "Old Name",
    value: inlineCode(oldRole.name),
   });
   fields.push({
    name: "New Name",
    value: inlineCode(newRole.name),
   });
  }

  if (oldRole.hexColor !== newRole.hexColor) {
   fields.push({
    name: "Old Color",
    value: inlineCode(oldRole.hexColor),
   });
   fields.push({
    name: "New Color",
    value: inlineCode(newRole.hexColor),
   });
  }

  if (oldRole.mentionable !== newRole.mentionable) {
   fields.push({
    name: "Mentionable",
    value: inlineCode(newRole.mentionable ? "Yes" : "No"),
   });
  }

  if (oldRole.hoist !== newRole.hoist) {
   fields.push({
    name: "Displayed Separately",
    value: inlineCode(newRole.hoist ? "Yes" : "No"),
   });
  }

  const embed = new EmbedBuilder()
   .setTitle("✏️ Role Updated")
   .setFields(fields)
   .setColor("#F59E0B")
   .setTimestamp()
   .setFooter({
    text: `Role updated`,
    iconURL: discordGuild.iconURL({ size: 256 }) || undefined,
   });

  logChannel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
