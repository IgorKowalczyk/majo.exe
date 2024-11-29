import { globalConfig } from "@majoexe/config";
import { deleteAutoModRule } from "./deleteAutoModRule";
import { fetchAutoModRules } from "./fetchAutoModRules";
import { Snowflake } from "discord-api-types/globals";
import { AutoMod } from "@majoexe/database";
import { RESTError, RESTGetAPIAutoModerationRuleResult } from "discord-api-types/v10";

export async function syncAutoModRule(guildId: Snowflake, ruleType: AutoMod["ruleType"]) {
 const rules = await fetchAutoModRules(guildId);
 const createdRule = rules.find((rule) => rule.ruleType === ruleType);

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

   const existingRule = (await existingRuleFetch.json()) as RESTGetAPIAutoModerationRuleResult | RESTError;

   if ("code" in existingRule) {
    await deleteAutoModRule(guildId, createdRule.ruleId);
    return null;
   }

   if (!existingRule || !existingRule.id) {
    await deleteAutoModRule(guildId, createdRule.ruleId);
    return null;
   } else {
    return existingRule;
   }
  } catch (_err) {
   await deleteAutoModRule(guildId, createdRule.ruleId);
   return null;
  }
 } else {
  return null;
 }
}
