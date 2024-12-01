import { globalConfig } from "@majoexe/config";
import { APIGuildPreview, Snowflake, RESTError } from "discord-api-types/v10";

export async function getGuildPreview(id: Snowflake): Promise<APIGuildPreview | null> {
 try {
  const res = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${id}/preview`, {
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });
  if (!res.ok) return null;

  const json = (await res.json()) as APIGuildPreview | RESTError;
  if ("code" in json) return null;

  return json;
 } catch (_e) {
  return null;
 }
}
