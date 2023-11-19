import { globalConfig } from "@majoexe/config";
import { deleteAutoModRule } from "./deleteAutoModRule.js";
import { fetchAutoModRules } from "./fetchAutoModRules.js";

/**
 * Syncs an automod rule with the database
 *
 * @param {string} guildId The id of the guild
 * @param {string} ruleType The type of the rule
 * @returns {Promise<>} The automod rule
 * @throws {Error} Will throw an error if the sync of the automod rule fails.
 */
export async function syncAutoModRule(guildId, ruleType) {
 const rules = await fetchAutoModRules(guildId);
 let createdRule = rules.find((rule) => rule.ruleType === ruleType);

 if (createdRule) {
  try {
   const existingRuleFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${guildId}/auto-moderation/rules/${createdRule.ruleId}`, {
    method: "GET",
    headers: {
     Authorization: `Bot ${process.env.TOKEN}`,
     "Content-Type": "application/json",
    },
   });

   if (!existingRuleFetch.ok) {
    await deleteAutoModRule(guildId, createdRule.ruleId);
    return null;
   }

   const existingRule = await existingRuleFetch.json();

   if (!existingRule || !existingRule.id) {
    await deleteAutoModRule(guildId, createdRule.ruleId);
    return null;
   } else {
    return existingRule;
   }
  } catch (err) {
   await deleteAutoModRule(guildId, createdRule.ruleId);
   return null;
  }
 } else {
  return null;
 }
}
