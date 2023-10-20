import prismaClient from "@majoexe/database";

/**
 * Check XP for user
 * @param {string} userId The id of the user
 * @param {string} guildId The id of the guild
 * @returns {Promise<number>} The XP
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
