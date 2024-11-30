import prismaClient from "@majoexe/database";
import { Snowflake } from "discord-api-types/globals";

export async function resetXP(userId: Snowflake, guildId: Snowflake) {
 try {
  const deleteAction = await prismaClient.guildXp.deleteMany({
   where: {
    guildId,
    userId,
   },
  });

  return deleteAction.count || 0;
 } catch (e) {
  console.log("Failed to reset XP:", e);
  throw e;
 }
}
