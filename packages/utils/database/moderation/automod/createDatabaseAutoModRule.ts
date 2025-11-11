import prismaClient from "@majoexe/database";
import { Snowflake } from "discord.js";

export async function createDatabaseAutoModRule(guildId: Snowflake, ruleId: Snowflake, ruleType: string) {
  try {
    await prismaClient.autoMod.create({
      data: {
        guildId,
        ruleId,
        ruleType,
      },
    });
  } catch (error) {
    console.error("Failed to create automod rule: ", error);
    throw error;
  }
}
