import { GuildLogType } from "@majoexe/database";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Role, EmbedBuilder, inlineCode, time } from "discord.js";
import type { Majobot } from "@/index";

export async function roleCreate(client: Majobot, role: Role) {
 try {
  if (!role.guild) return;
  const settings = await getGuildLogSettings(role.guild.id, GuildLogType.GuildRoleCreate);
  if (!settings?.enabled || !settings.channelId) return;
  const discordGuild = role.guild;
  const logChannel = await discordGuild.channels.fetch(settings.channelId);
  if (!logChannel || !logChannel.isTextBased()) return;

  const fields = [
   {
    name: "Role",
    value: `${role.toString()} (${inlineCode(role.name)})`,
   },
   {
    name: "ID",
    value: inlineCode(role.id),
   },
   {
    name: "Created At",
    value: time(role.createdAt),
   },
   {
    name: "Color",
    value: inlineCode(role.hexColor),
   },
   {
    name: "Mentionable",
    value: inlineCode(role.mentionable ? "Yes" : "No"),
   },
   {
    name: "Displayed Separately",
    value: inlineCode(role.hoist ? "Yes" : "No"),
   },
  ];

  const embed = new EmbedBuilder()
   .setTitle("➕ Role Created")
   .setFields(fields)
   .setColor("#10B981")
   .setTimestamp()
   .setFooter({
    text: "Role created",
    iconURL: discordGuild.iconURL({ size: 256 }) || undefined,
   });

  logChannel.send({ embeds: [embed] });
 } catch (err: unknown) {
  client.debugger("error", err);
 }
}
