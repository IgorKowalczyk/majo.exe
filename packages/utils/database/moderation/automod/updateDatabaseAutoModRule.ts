import prismaClient from "@majoexe/database";
import { Snowflake } from "discord.js";

export async function updateDatabaseAutoModRule(guildId: Snowflake, ruleId: Snowflake, ruleType: string) {
 try {
  await prismaClient.autoMod.update({
   where: {
    ruleId,
   },
   data: {
    guildId,
    ruleId,
    ruleType,
   },
  });
 } catch (error) {
  console.error("Failed to update automod rule: ", error);
  throw error;
 }
}
