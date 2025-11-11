import prismaClient from "@majoexe/database";
import type { AutoMod } from "@majoexe/database/types";
import { Snowflake } from "discord-api-types/globals";

export async function fetchDatabaseAutoModRules(guildId: Snowflake) {
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

export async function fetchDatabaseAutoModRule(guildId: Snowflake, ruleId: AutoMod["ruleId"]) {
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
