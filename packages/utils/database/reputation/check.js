import prismaClient from "@majoexe/database";

/**
 * Check Reputation for user
 * @param {string} userId The id of the user
 * @param {string} guildId The id of the guild
 * @returns {number} The amount of Reputation
 */
export async function checkReputation(userId, guildId) {
 try {
  const rep = await prismaClient.reputation.findFirst({
   where: {
    guildId,
    userId: userId,
   },
  });

  if (!rep) return 0;
  return rep.reputation || 0;
 } catch (error) {
  console.error("Failed to check reputation:", error);
  throw error;
 }
}
