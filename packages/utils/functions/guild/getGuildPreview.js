import { globalConfig } from "@nyxia/config";

/**
 * Get the preview of a server.
 *
 * @param {string} id - The id of the server.
 * @returns {Promise<object>} - The preview of the server.
 * @throws {Error} - Throws an error if the operation fails.
 * @example getGuildPreview(id)
 * */
export async function getGuildPreview(id) {
 try {
  const res = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${id}/preview`, {
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });
  if (!res.ok) return { error: "Invalid server ID" };
  const json = await res.json();
  return json;
 } catch (e) {
  return { error: "Invalid server ID" };
 }
}
