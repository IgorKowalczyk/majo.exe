import prismaClient from "@nyxia/database";

/**
 * Delete an automod rule
 *
 * @param {string} guildId The id of the guild
 * @param {string} ruleId The id of the rule
 * @returns {Promise<void>} Promise that resolves when the rule is deleted
 * @throws {Error} Error that is thrown if the rule could not be deleted
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
