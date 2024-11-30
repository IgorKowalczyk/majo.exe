import { globalConfig } from "@majoexe/config";
import { APIGuild } from "discord-api-types/v10";
import { getPermissionNames } from "../user/getPermissionNames";

export interface ExtendedAPIGuild extends APIGuild {
 permissions_names: string[];
 bot: boolean;
}

export async function getMemberGuilds(token: string) {
 try {
  const res = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/users/@me/guilds`, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  });
  if (!res.ok) return null;
  const json = (await res.json()) as ExtendedAPIGuild[];

  for (const guild of json) {
   guild.permissions_names = getPermissionNames(BigInt(guild.permissions || 0)) || [];
  }
  return json;
 } catch (_e) {
  return null;
 }
}
