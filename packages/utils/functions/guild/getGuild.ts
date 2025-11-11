import { globalConfig } from "@majoexe/config";
import { cacheGet, cacheSet } from "@majoexe/database/redis";
import { APIGuild, RESTError, Snowflake } from "discord-api-types/v10";
import { isBotInServer } from "./isBotInServer";

export async function getGuild(id: Snowflake) {
  try {
    const cached = (JSON.parse((await cacheGet(`guild:${id}:data`)) as unknown as string) as APIGuild) || null;
    if (cached && typeof cached === "object" && cached.id === id) return JSON.parse(JSON.stringify(cached)) as APIGuild & { bot: boolean };

    const res = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${id}`, {
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as (APIGuild & { bot: boolean }) | RESTError;

    if ("code" in json) return null;

    json.bot = await isBotInServer(id);

    await cacheSet(`guild:${id}:data`, json, 10);

    return json;
  } catch (_e) {
    return null;
  }
}
