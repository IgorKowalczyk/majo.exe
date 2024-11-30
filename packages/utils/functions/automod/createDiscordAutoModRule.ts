import { globalConfig } from "@majoexe/config";
import { type APIAutoModerationRule, AutoModerationRuleTriggerType } from "discord-api-types/v10";
import { createDatabaseAutoModRule, deleteDatabaseAutoModRule, syncDatabaseAutoModRule, updateDatabaseAutoModRule } from "../../database";
import { fetchDiscordAutoModRules } from "./fetchDiscordAutoModRules";
import { deleteDiscordAutoModRules } from "./deleteDiscordAutoModRule";

export async function createDiscordAutoModRule(serverId: string, ruleType: string, ruleData: Omit<APIAutoModerationRule, "id" | "guild_id">) {
 const existingRule = await syncDatabaseAutoModRule(serverId, ruleType);
 const discordRules = await fetchDiscordAutoModRules(serverId);

 const conflictingKeywordRules = discordRules.filter((rule) => rule.trigger_type === AutoModerationRuleTriggerType.Keyword);
 const conflictingSpamRules = discordRules.filter((rule) => rule.trigger_type === AutoModerationRuleTriggerType.Spam);

 if (conflictingKeywordRules.length === 6 && ruleData.enabled) {
  return {
   error: "You can only have 6 keyword rules enabled at once. Please disable one of the existing keyword rules before enabling this one.",
   code: 400,
  };
 }

 if (conflictingSpamRules.length > 0 && ruleData.enabled) {
  const first = conflictingSpamRules[0] as APIAutoModerationRule;
  await deleteDiscordAutoModRules(serverId, first.id);
 }

 if (existingRule) {
  const discordRequest = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${serverId}/auto-moderation/rules/${existingRule.id}`, {
   method: "PATCH",
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
    "Content-Type": "application/json",
   },
   body: JSON.stringify(ruleData),
  });

  if (!discordRequest.ok) {
   return {
    error: "Something went wrong while trying to update auto moderation",
    code: 500,
   };
  }

  await updateDatabaseAutoModRule(serverId, existingRule.id, ruleType);

  return {
   error: null,
   code: 200,
  };
 } else {
  const discordRequest = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${serverId}/auto-moderation/rules`, {
   method: "POST",
   headers: {
    Authorization: `Bot ${process.env.TOKEN}`,
    "Content-Type": "application/json",
   },
   body: JSON.stringify(ruleData),
  });

  if (!discordRequest.ok) {
   return {
    error: "Something went wrong while trying to update auto moderation",
    code: 500,
   };
  }

  const discordData = (await discordRequest.json()) as APIAutoModerationRule;
  await createDatabaseAutoModRule(serverId, discordData.id, ruleType);

  return {
   error: null,
   code: 200,
  };
 }
}
