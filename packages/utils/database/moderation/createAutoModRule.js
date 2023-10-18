import prismaClient from "@majoexe/database";

/**
 * Create an automod rule
 * @param {string} guildId The id of the guild
 * @param {string} ruleId The id of the rule
 * @param {string} ruleType The type of the rule
 * @param {boolean} enabled Whether the rule is enabled
 * @returns {Promise<void>}
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
