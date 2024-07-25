import prismaClient from "@nyxia/database";

/**
 * Check XP for user
 *
 * @param {string} userId - The ID of the user
 * @param {string} guildId - The ID of the guild
 * @returns {Promise<number>} - The XP of the user in the guild
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function checkXP(userId, guildId) {
 try {
  const xp = await prismaClient.guildXp.findFirst({
   where: {
    guildId,
    userId,
   },
  });

  if (!xp) return 0;
  return xp.xp || 0;
 } catch (error) {
  console.error("Failed to check XP:", error);
  throw error;
 }
}
