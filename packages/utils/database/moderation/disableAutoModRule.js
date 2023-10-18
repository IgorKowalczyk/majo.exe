import prismaClient from "@majoexe/database";

/**
 * Disable an automod rule
 * @param {string} guildId The id of the guild
 * @param {string} ruleId The id of the rule
 * @returns {Promise<void>}
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
