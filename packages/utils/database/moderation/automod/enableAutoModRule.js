import prismaClient from "@majoexe/database";

/**
 * Enable an automod rule
 *
 * @param {string} guildId The id of the guild
 * @param {string} ruleId The id of the rule
 * @returns {Promise<void>} Promise that resolves when the rule is enabled
 * @throws {Error} Error that is thrown if the rule could not be enabled
 */
export async function enableAutoModRule(guildId, ruleId) {
 try {
  await prismaClient.autoMod.update({
   where: {
    guildId,
    ruleId,
   },
   data: {
    enabled: true,
   },
  });
 } catch (error) {
  console.error("Failed to enable automod rule: ", error);
  throw error;
 }
}
