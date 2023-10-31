import prismaClient from "@majoexe/database";

/**
 * Disable an automod rule
 *
 * @param {string} guildId The id of the guild
 * @param {string} ruleId The id of the rule
 * @returns {Promise<void>} Promise that resolves when the rule is disabled
 * @throws {Error} Error that is thrown if the rule could not be disabled
 */
export async function disableAutoModRule(guildId, ruleId) {
 try {
  await prismaClient.autoMod.update({
   where: {
    guildId,
    ruleId,
   },
   data: {
    enabled: false,
   },
  });
 } catch (error) {
  console.error("Failed to disable automod rule: ", error);
  throw error;
 }
}
