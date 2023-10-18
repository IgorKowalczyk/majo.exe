import prismaClient from "@majoexe/database";

/**
 * Fetch all automod rules for a guild
 * @param {string} guildId The id of the guild
 * @returns {Promise<>} The automod rules
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
