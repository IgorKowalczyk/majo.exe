import { globalConfig } from "@majoexe/config";
import { cacheGet, cacheSet } from "@majoexe/database/redis";
import { APIGuildPreview, Snowflake, RESTError } from "discord-api-types/v10";

export async function getGuildPreview(id: Snowflake): Promise<APIGuildPreview | null> {
  try {
    const cached = await cacheGet(`guild:${id}:preview`);
    if (cached && typeof cached === "string") {
      try {
        const parsed = JSON.parse(cached) as APIGuildPreview;
        return parsed;
      } catch {
        return null;
      }
    }
    const res = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${id}/preview`, {
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    });
    if (!res.ok) return null;

    const json = (await res.json()) as APIGuildPreview | RESTError;
    if ("code" in json) return null;

    await cacheSet(`guild:${id}:preview`, json, 30);

    return json;
  } catch (_e) {
    return null;
  }
}
