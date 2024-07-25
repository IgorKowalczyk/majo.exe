import { globalConfig } from "@nyxia/config";

/**
 * Checks if the bot is in a server
 *
 * @param {string} guildId - The guild ID.
 * @returns {Promise<boolean>} - Whether the bot is in the server.
 * @throws {Error} - Throws an error if the operation fails.
 * */
export async function isBotInServer(guildId) {
 try {
  const res = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${guildId}/members/${process.env.CLIENT_ID}`, {
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
   },
  });
  if (res.ok) return true;
  return false;
 } catch (e) {
  return false;
 }
}
