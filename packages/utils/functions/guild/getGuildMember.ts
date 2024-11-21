import { Snowflake } from "discord-api-types/globals";
import { getServers } from "./getServers";

export async function getGuildMember(guildId: Snowflake, token: string) {
 try {
  const servers = await getServers(token);
  if (!servers) return null;
  const server = servers.find((server) => server.id === guildId);
  if (!server) return null;
  return server;
 } catch (_e) {
  return null;
 }
}
