import prismaClient from "@majoexe/database";

/**
 * Delete an automod rule
 * @param {string} guildId The id of the guild
 * @param {string} ruleId The id of the rule
 * @returns {Promise<void>}
 */
export async function deleteAutoModRule(guildId, ruleId) {
 try {
  await prismaClient.autoMod.delete({
   where: {
    guildId,
    ruleId,
   },
  });
 } catch (error) {
  console.error("Failed to delete automod rule: ", error);
  throw error;
 }
}
