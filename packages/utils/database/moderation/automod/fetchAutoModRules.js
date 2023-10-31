import prismaClient from "@majoexe/database";

/**
 * Fetch all automod rules for a guild
 *
 * @param {string} guildId The id of the guild
 * @returns {Promise<>} The automod rules
 * @throws {Error} Error that is thrown if the automod rules could not be fetched
 */
export async function fetchAutoModRules(guildId) {
 try {
  const rules = await prismaClient.autoMod.findMany({
   where: {
    guildId,
   },
  });

  return rules;
 } catch (error) {
  console.error("Failed to fetch automod rules: ", error);
  throw error;
 }
}
