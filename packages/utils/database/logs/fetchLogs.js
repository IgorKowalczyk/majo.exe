import prismaClient from "@majoexe/database";

/**
 * Fetches logs for a guild.
 *
 * @param {string} guildId - The ID of the guild.
 * @param {number} page - The page number to fetch.
 * @param {number} [count=20] - The number of logs to fetch per page.
 * @returns {Promise<Array>} - Returns an array of log objects for the specified guild.
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function fetchLogs(guildId, page, count = 20) {
 try {
  const logs = await prismaClient.guildLogs.findMany({
   where: {
    guildId,
   },
   take: count,
   skip: (page - 1) * count,
   orderBy: {
    createdAt: "asc",
   },
   include: {
    user: true,
   },
  });

  return logs;
 } catch (e) {
  console.log("Failed to fetch logs:", e);
  throw e;
 }
}

/**
 * Counts the number of logs for a guild.
 *
 * @param {string} guildId - The ID of the guild.
 * @returns {Promise<number>} - Returns the number of logs for the specified guild.
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function countLogs(guildId) {
 try {
  const logs = await prismaClient.guildLogs.count({
   where: {
    guildId,
   },
  });

  return logs;
 } catch (e) {
  console.log("Failed to count logs:", e);
  throw e;
 }
}
