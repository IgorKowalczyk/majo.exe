import prismaClient from "@majoexe/database";

/**
 * Clears all warnings for a guild member.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} guildId - The ID of the guild.
 * @returns {Promise<boolean>} - Returns the number of warnings that were cleared.
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function clearWarns(userId, guildId) {
 try {
  const allWarnings = await prismaClient.guildWarns.deleteMany({
   where: {
    guildId,
    user: {
     discordId: userId,
    },
   },
  });

  return allWarnings?.count || 0;
 } catch (error) {
  console.error("Failed to clear warns:", error);
  throw error;
 }
}
