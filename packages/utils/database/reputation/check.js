import prismaClient from "@majoexe/database";

/**
 * Checks the reputation of a user in a guild.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} guildId - The ID of the guild.
 * @returns {Promise<number>} - Returns the reputation of the user in the guild, or 0 if the user has no reputation.
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function checkReputation(userId, guildId) {
 try {
  const rep = await prismaClient.reputation.findFirst({
   where: {
    guildId,
    userId,
   },
  });

  if (!rep) return 0;
  return rep.reputation || 0;
 } catch (error) {
  console.error("Failed to check reputation:", error);
  throw error;
 }
}
