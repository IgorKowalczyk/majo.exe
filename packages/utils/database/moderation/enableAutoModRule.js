import prismaClient from "@majoexe/database";

/**
 * Enable an automod rule
 * @param {string} guildId The id of the guild
 * @param {string} ruleId The id of the rule
 * @returns {Promise<void>}
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
