import { globalConfig } from "@majoexe/config";
import prismaClient from "@majoexe/database";
import { type APIAutoModerationRule, AutoModerationRuleTriggerType } from "discord-api-types/v10";
import { syncAutoModRule } from "../../../database";

interface ErrorResponse {
 error: string;
 code: number;
}

interface SuccessResponse {
 error: null;
 code: number;
}

export async function createHTTPAutomodRule(serverId: string, ruleType: string, ruleData: Omit<APIAutoModerationRule, "id" | "guild_id" | "creator_id">): Promise<ErrorResponse | SuccessResponse> {
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

 const check = (await checkFetch.json()) as APIAutoModerationRule[];
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

  const discordData = (await discordRequest.json()) as APIAutoModerationRule;

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
