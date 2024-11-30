import { globalConfig } from "@majoexe/config";
import { APIGuildChannel, GuildChannelType, RESTError, Snowflake } from "discord.js";

export async function getGuildChannels(guildId: Snowflake, types: GuildChannelType[]): Promise<APIGuildChannel<GuildChannelType>[] | null> {
 try {
  const allChannelsFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${guildId}/channels`, {
   method: "GET",
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });

  const allChannelsData = (await allChannelsFetch.json()) as APIGuildChannel<GuildChannelType>[] | RESTError;

  if ("code" in allChannelsData) return null;

  return allChannelsData.filter((channel) => types.includes(channel.type));
 } catch (_e) {
  return null;
 }
}
