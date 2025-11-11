import { globalConfig } from "@majoexe/config";
import { cacheGet, cacheSet } from "@majoexe/database/redis";
import { APIGuild, RESTError } from "discord-api-types/v10";
import { getPermissionNames } from "../user/getPermissionNames";

export interface ExtendedAPIGuild extends APIGuild {
  permissions_names: string[];
  bot: boolean;
}

export async function getMemberGuilds(token: string) {
  try {
    const cached = await cacheGet(`user:token:${token}:guilds`);
    if (cached && typeof cached === "string") {
      try {
        const parsed = JSON.parse(cached) as ExtendedAPIGuild[];
        return parsed;
      } catch {
        return null;
      }
    }

    const res = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ExtendedAPIGuild[] | RESTError;
    if (!Array.isArray(json)) return null;

    for (const guild of json) {
      guild.permissions_names = getPermissionNames(BigInt(guild.permissions || 0)) || [];
    }

    await cacheSet(`user:token:${token}:guilds`, json, 30);

    return json;
  } catch (_e) {
    return null;
  }
}
