import { globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { AutoModerationRuleTriggerType } from "discord-api-types/v10";
import { syncAutoModRule } from "../../../database";

/**
 * Create an AutoMod rule using the Discord API
 *
 * @param {string} serverId Discord server ID
 * @param {string} ruleType Rule type to sync/create
 * @param {object} ruleData Rule data to send to Discord
 * @returns {Promise<{error: string, code: number}>} Error message and code
 */
export async function createHTTPAutomodRule(serverId, ruleType, ruleData) {
 const existingRule = await syncAutoModRule(serverId, ruleType);

 const checkFetch = await fetch(`https://discord.com/api/v${globalConfig.apiVersion}/guilds/${serverId}/auto-moderation/rules`, {
  method: "GET",
  headers: {
   Authorization: `Bot ${process.env.TOKEN}`,
   "Content-Type": "application/json",
  },
 });

 if (!checkFetch.ok) {
  return {
   error: "Something went wrong while trying to update auto moderation",
   code: 500,
  };
 }

 const check = await checkFetch.json();
 const conflictingRules = check.filter((rule) => rule.trigger_type === AutoModerationRuleTriggerType.Keyword);

 if (conflictingRules.length === 6 && ruleData.enabled) {
  return {
   error: "You can only have 6 keyword rules enabled at once. Please disable one of the existing keyword rules before enabling this one.",
   code: 400,
  };
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

  await prismaClient.autoMod.update({
   where: {
    ruleId: existingRule.id,
   },
   data: {
    guild: {
     connect: {
      guildId: serverId,
     },
    },
    ruleType,
   },
  });

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

  const discordData = await discordRequest.json();

  await prismaClient.autoMod.create({
   data: {
    guild: {
     connect: {
      guildId: serverId,
     },
    },
    ruleId: discordData.id.toString(),
    ruleType,
   },
  });

  return {
   error: null,
   code: 200,
  };
 }
}
