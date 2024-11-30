import { globalConfig } from "@majoexe/config";
import { RESTGetAPIGuildRolesResult } from "discord-api-types/v10";
import { RESTError, Snowflake } from "discord.js";

export async function getGuildRoles(guildId: Snowflake): Promise<RESTGetAPIGuildRolesResult | null> {
 try {
  const allRolesFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${guildId}/roles`, {
   method: "GET",
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });

  const allRolesData = (await allRolesFetch.json()) as RESTGetAPIGuildRolesResult | RESTError;

  if ("code" in allRolesData) return null;

  return allRolesData.filter((role) => role.name !== "@everyone");
 } catch (_e) {
  return null;
 }
}
