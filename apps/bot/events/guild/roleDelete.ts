import { GuildLogType } from "@majoexe/database/types";
import { getGuildLogSettings } from "@majoexe/util/database";
import { Role, EmbedBuilder, inlineCode, time } from "discord.js";
import type { Majobot } from "@/index";

export async function roleDelete(client: Majobot, role: Role) {
  try {
    if (!role.guild) return;
    const settings = await getGuildLogSettings(role.guild.id, GuildLogType.GuildRoleDelete);
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
        name: "Deleted At",
        value: time(Math.round(Date.now() / 1000)),
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
      .setTitle("❌ Role Deleted")
      .setFields(fields)
      .setColor("#EF4444")
      .setTimestamp()
      .setFooter({
        text: "Role deleted",
        iconURL: discordGuild.iconURL({ size: 256 }) || undefined,
      });

    logChannel.send({ embeds: [embed] });
  } catch (err: unknown) {
    client.debugger("error", err);
  }
}
