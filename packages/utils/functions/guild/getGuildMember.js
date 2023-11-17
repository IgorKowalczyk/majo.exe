import { getServers } from "./getServers.js";

/**
 * Get a member of a server.
 *
 * @param {string} guildId - The id of the server.
 * @param {string} token - The token of the user.
 * @returns {Promise<object>} - The member of the server including permissions.
 * @throws {Error} - Throws an error if the operation fails.
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
