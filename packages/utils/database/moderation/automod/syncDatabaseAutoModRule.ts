import { globalConfig } from "@majoexe/config";
import { AutoMod } from "@majoexe/database";
import { Snowflake } from "discord-api-types/globals";
import { RESTError, RESTGetAPIAutoModerationRuleResult } from "discord-api-types/v10";
import { deleteDatabaseAutoModRule } from "./deleteDatabaseAutoModRule";
import { fetchDatabaseAutoModRules } from "./fetchDatabaseAutoModRules";

export async function syncDatabaseAutoModRule(guildId: Snowflake, ruleType: AutoMod["ruleType"]) {
 const rules = await fetchDatabaseAutoModRules(guildId);
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
    await deleteDatabaseAutoModRule(guildId, createdRule.ruleId);
    return null;
   }

   const existingRule = (await existingRuleFetch.json()) as RESTGetAPIAutoModerationRuleResult | RESTError;

   if ("code" in existingRule) {
    await deleteDatabaseAutoModRule(guildId, createdRule.ruleId);
    return null;
   }

   if (!existingRule || !existingRule.id) {
    await deleteDatabaseAutoModRule(guildId, createdRule.ruleId);
    return null;
   } else {
    return existingRule;
   }
  } catch (_err) {
   await deleteDatabaseAutoModRule(guildId, createdRule.ruleId);
   return null;
  }
 } else {
  return null;
 }
}
