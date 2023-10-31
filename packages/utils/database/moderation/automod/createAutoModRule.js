import prismaClient from "@majoexe/database";

/**
 * Create an automod rule
 *
 * @param {string} guildId The ID of the guild
 * @param {string} ruleId The ID of the rule
 * @param {string} ruleType The type of the rule
 * @param {boolean} enabled Whether the rule is enabled
 * @returns {Promise<void>} Promise that resolves when the rule is created
 * @throws {Error} Error that is thrown if the rule could not be created
 */
export async function createAutoModRule(guildId, ruleId, ruleType, enabled) {
 try {
  await prismaClient.autoMod.create({
   data: {
    guildId,
    ruleId,
    ruleType,
    enabled,
   },
  });
 } catch (error) {
  console.error("Failed to create automod rule: ", error);
  throw error;
 }
}
