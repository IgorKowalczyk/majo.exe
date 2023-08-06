import { getServers } from "./getServers";

/**
 * @param {string} guildId The id of the server.
 * @param {string} token The token of the user.
 * @returns {Promise<any>} The member of the server including permissions.
 * @example getGuildMember(guildId, userId)
 * */
export async function getGuildMember(guildId, token) {
 try {
  const servers = await getServers(token);
  if (!servers) return { error: "Invalid token" };
  const server = servers.find((server) => server.id === guildId);
  if (!server) return { error: "Invalid server ID" };
  return server;
 } catch (e) {
  return { error: "Invalid server ID or user token" };
 }
}
