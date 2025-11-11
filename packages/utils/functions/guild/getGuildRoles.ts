import { globalConfig } from "@majoexe/config";
import { cacheGet, cacheSet } from "@majoexe/database/redis";
import { RESTGetAPIGuildRolesResult } from "discord-api-types/v10";
import { RESTError, Snowflake } from "discord.js";

export async function getGuildRoles(guildId: Snowflake): Promise<RESTGetAPIGuildRolesResult | null> {
  try {
    const cached = await cacheGet(`guild:${guildId}:roles`);
    if (cached && typeof cached === "string") {
      try {
        const parsed = JSON.parse(cached) as RESTGetAPIGuildRolesResult;
        return parsed.filter((role) => role.name !== "@everyone");
      } catch {
        return null;
      }
    }

    const allRolesFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${guildId}/roles`, {
      method: "GET",
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    });

    const allRolesData = (await allRolesFetch.json()) as RESTGetAPIGuildRolesResult | RESTError;

    if ("code" in allRolesData) return null;

    await cacheSet(`guild:${guildId}:roles`, allRolesData, 10);

    return allRolesData.filter((role) => role.name !== "@everyone");
  } catch (_e) {
    return null;
  }
}
