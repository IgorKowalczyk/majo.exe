import prismaClient from "@majoexe/database";

/**
 * Removes a warning from a guild member.
 *
 * @param {string} guildId - The ID of the guild.
 * @param {string} userId - The ID of the user.
 * @param {number} warnId - The ID of the warning.
 * @returns {Promise<any>} - Returns the warning object if it was successfully removed, false otherwise.
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function removeWarning(guildId, userId, warnId) {
 try {
  const warning = await prismaClient.guildWarns.findFirst({
   where: {
    guildId,
    user: {
     discordId: userId,
    },
    warnId,
   },
  });

  if (!warning) return false;

  await prismaClient.guildWarns.delete({
   where: {
    id: warning.id,
   },
  });

  return warning;
 } catch (error) {
  console.error("Failed to remove warning: ", error);
  throw error;
 }
}
