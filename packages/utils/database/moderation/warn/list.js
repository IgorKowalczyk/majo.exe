import prismaClient from "@majoexe/database";

/**
 * Lists all warnings for a guild member.
 *
 * @param {string} guildId - The ID of the guild.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - Returns an array of warning objects for the specified user in the specified guild.
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function listWarnings(guildId, userId) {
 try {
  const warnings = await prismaClient.guildWarns.findMany({
   where: {
    guildId,
    user: {
     discordId: userId,
    },
   },
  });

  return warnings;
 } catch (error) {
  console.error("Failed to list warnings:", error);
  throw error;
 }
}
