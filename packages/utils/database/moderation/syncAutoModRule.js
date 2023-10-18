import { fetchAutoModRules } from "./fetchAutoModRules.js";
import { enableAutoModRule } from "./enableAutoModRule.js";
import { disableAutoModRule } from "./disableAutoModRule.js";
import { deleteAutoModRule } from "./deleteAutoModRule.js";

/**
 * Syncs an automod rule with the database
 * @param {string} interaction The discord interaction
 * @param {string} ruleType The type of the rule
 * @returns {Promise<>} The automod rule
 */
export async function syncAutoModRule(interaction, ruleType) {
 const rules = await fetchAutoModRules(interaction.guild.id);

 let createdRule = rules.find((rule) => rule.ruleType === ruleType);

 if (createdRule) {
  try {
   const existingRule = await interaction.guild.autoModerationRules.fetch({ autoModerationRule: createdRule.ruleId, cache: false, force: true });
   if (!existingRule) {
    await deleteAutoModRule(interaction.guild.id, createdRule.ruleId);
    createdRule = null;
   } else if (createdRule.enabled !== existingRule.enabled) {
    existingRule.enabled ? await enableAutoModRule(interaction.guild.id, createdRule.ruleId) : await disableAutoModRule(interaction.guild.id, createdRule.ruleId);
    createdRule.enabled = existingRule.enabled;
   }
  } catch (err) {
   await deleteAutoModRule(interaction.guild.id, createdRule.ruleId);
   createdRule = null;
  }
 }

 return createdRule;
}
