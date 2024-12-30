import { globalConfig } from "@majoexe/config";
import { cacheGet, cacheSet } from "@majoexe/database/redis";
import { APIGuildChannel, GuildChannelType, RESTError, Snowflake } from "discord.js";

export async function getGuildChannels(guildId: Snowflake, types: GuildChannelType[]): Promise<APIGuildChannel<GuildChannelType>[] | null> {
 try {
  const cached = await cacheGet(`guild:${guildId}:channels`);
  if (cached && typeof cached === "string") {
   try {
    const parsed = JSON.parse(cached) as APIGuildChannel<GuildChannelType>[];
    return parsed.filter((channel) => types.includes(channel.type));
   } catch {
    return null;
   }
  }

  const allChannelsFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${guildId}/channels`, {
   method: "GET",
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });

  const allChannelsData = (await allChannelsFetch.json()) as APIGuildChannel<GuildChannelType>[] | RESTError;

  if ("code" in allChannelsData) return null;

  await cacheSet(`guild:${guildId}:channels`, allChannelsData, 10);

  return allChannelsData.filter((channel) => types.includes(channel.type));
 } catch (_e) {
  return null;
 }
}
