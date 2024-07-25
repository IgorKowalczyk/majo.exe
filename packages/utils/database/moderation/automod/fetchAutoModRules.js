import prismaClient from "@nyxia/database";

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

/**
 * Fetch an automod rule for a guild
 *
 * @param {string} guildId The id of the guild
 * @param {string} ruleId The id of the rule
 * @returns {Promise<>} The automod rule
 * @throws {Error} Error that is thrown if the automod rule could not be fetched
 */
export async function fetchAutoModRule(guildId, ruleId) {
 try {
  const rule = await prismaClient.autoMod.findFirst({
   where: {
    guildId,
    ruleId,
   },
  });

  return rule;
 } catch (error) {
  console.error("Failed to fetch automod rule: ", error);
  throw error;
 }
}
