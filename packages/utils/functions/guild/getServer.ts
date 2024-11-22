import { globalConfig } from "@majoexe/config";
import { isBotInServer } from "./isBotInServer";
import { APIGuild, RESTError, Snowflake } from "discord-api-types/v10";

export async function getServer(id: Snowflake): Promise<(APIGuild & { bot: boolean }) | null> {
 try {
  const res = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${id}`, {
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });
  if (!res.ok) return null;
  const json = (await res.json()) as (APIGuild & { bot: boolean }) | RESTError;

  if ("code" in json) return null;

  json.bot = await isBotInServer(id);

  return json;
 } catch (_e) {
  return null;
 }
}
