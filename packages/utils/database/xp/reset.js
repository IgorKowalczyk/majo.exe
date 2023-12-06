import prismaClient from "@majoexe/database";

/**
 * Reset XP for user
 *
 * @param {string} userId - The id of the user
 * @param {string} guildId - The id of the guild
 * @returns {Promise<boolean>} - Whether the operation was successful
 * @throws {Error} - Throws an error if the operation fails.
 * */
export async function resetXP(userId, guildId) {
 try {
  await prismaClient.guildXp.deleteMany({
   where: {
    guildId,
    userId,
   },
  });

  return true;
 } catch (e) {
  console.log("Failed to reset XP:", e);
  throw e;
 }
}
